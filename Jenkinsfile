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
                dependencyCheckAnalyzer ( 
                    datadir: '~/scripts/dependency-check/', 
                    isAutoupdateDisabled: true, 
                    includeVulnReports: true, 
                    hintsFile: '', 
                    includeCsvReports: false, 
                    includeHtmlReports: true, 
                    includeJsonReports: false, 
                    outdir: "", 
                    scanpath: "${WORKSPACE}", 
                    skipOnScmChange: false, 
                    skipOnUpstreamChange: false, 
                    suppressionFile: '', 
                    zipExtensions: ''
                ) 
          
                dependencyCheckPublisher ( 
                    pattern: "/reports/dependency-check-report.xml"
                )
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
                    ssh common@192.168.1.7 "cd dvna && pm2 resurrect && pm2 stop DVNA && pm2 delete DVNA"
                    ssh common@192.168.1.7 "rm -rf dvna && mkdir dvna"
                    scp -r * common@192.168.1.7:~/dvna
                    ssh -T common@192.168.1.7 "cd dvna && MYSQL_USER=${MYSQL_USER} MYSQL_DATABASE=${MYSQL_DATABASE} MYSQL_PASSWORD=${MYSQL_PASSWORD} MYSQL_HOST=${MYSQL_HOST} MYSQL_PORT=${MYSQL_PORT} pm2 start --name=DVNA npm -- start && pm2 save"
                '''
            }
        }
    }
}