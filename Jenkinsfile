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
                sh '''
                    retire --outputformat json  --outputpath ~/reports/retire.json | exit 0
                '''
            }
        }

        stage ('Performing OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--format JSON --out /home/jenkins/reports/', odcInstallation: 'DVNA'
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
                    ssh -v common@192.168.1.4 "cd dvna && pm2 resurrect && pm2 stop DVNA && pm2 delete DVNA"
                    ssh -v common@192.168.1.4 "rm -rf dvna && mkdir dvna"
                    scp -r * common@192.168.1.4:~/dvna
                    ssh -v common@192.168.1.4 "cd dvna && MYSQL_USER=${MYSQL_USER} MYSQL_DATABASE=${MYSQL_DATABASE} MYSQL_PASSWORD=${MYSQL_PASSWORD} MYSQL_HOST=${MYSQL_HOST} MYSQL_PORT=${MYSQL_PORT} pm2 start --name=DVNA npm -- start && pm2 save"
                '''
            }
        }
    }
}