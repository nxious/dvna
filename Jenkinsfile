pipeline {
    agent any
    stages {
        stage ('Building the application') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Performing NPM audit') {
            steps {
                sh '''
                    npm-audit-ci-wrapper --json > ~/reports/npm-audit.json
                '''
            }
        }

        stage ('Performing retire.js audit') {
            steps {
                sh 'bash ~/scripts/retirejs.sh'
            }
        }

        stage ('Performind audit.js check') {
            steps{
                withCredentials([string(credentialsId: 'OSSI_API_KEY', variable: 'OSSI_API_KEY'), string(credentialsId: 'OSSI_USERNAME', variable: 'OSSI_USERNAME')]) {
                    sh 'bash ~/scripts/auditjs.sh'
                }  
            }
        }

        stage ('Performing OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--format JSON dependency-check-report.json', odcInstallation: 'DVNA'
                sh 'mv dependency-check-report.json ~/reports/'                
            }
        }

        stage ('Performing njsscan check') {
            steps {
                sh 'bash ~/scripts/njsscan.sh'
            }
        }

        stage ('Performing insider check') {
            steps {
                sh 'bash ~/scripts/insider.sh'
            }
        }

        stage ('Performind snyk.io analysis') {
            steps{
                withCredentials([string(credentialsId: 'SNYK_API_KEY', variable: 'SNYK_API_KEY')]) {
                    sh 'bash ~/scripts/snyk.sh'
                }  
            }
        }

        stage ('Performing SonarQube analysis') {
            steps{
                withSonarQubeEnv(installationName: 'SonarQube', credentialsId: 'SONARQUBE_TOKEN') {
                    sh '~/scripts/sonarqube/bin/sonar-scanner'
                }
            }
        }

        stage ('Deploying the application') {
            environment{
                MYSQL_USER = credentials('MYSQL_USER')
                MYSQL_DATABASE = credentials('MYSQL_DATABASE')
                MYSQL_PASSWORD = credentials('MYSQL_PASSWORD')
                MYSQL_HOST = credentials('MYSQL_HOST')
                MYSQL_PORT = credentials('MYSQL_PORT')
            }

            steps {
                sh '''
                    ssh common@192.168.1.5 "cd dvna && pm2 resurrect && pm2 stop DVNA && pm2 delete DVNA"
                    ssh common@192.168.1.5 "rm -rf dvna && mkdir dvna"
                    scp -r * common@192.168.1.5:~/dvna
                    ssh -T common@192.168.1.5 "cd dvna && MYSQL_USER=${MYSQL_USER} MYSQL_DATABASE=${MYSQL_DATABASE} MYSQL_PASSWORD=${MYSQL_PASSWORD} MYSQL_HOST=${MYSQL_HOST} MYSQL_PORT=${MYSQL_PORT} pm2 start --name=DVNA npm -- start && pm2 save"
                '''
            }
        }
    }
}