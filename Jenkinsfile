pipeline {
    agent any
    stages {
        stage ('Building the application') {
            steps {
                sh 'npm install'
            }
        }

        stage ('Deploying the application') {
            environment{
                MYSQL_USER = 'root'
                MYSQL_DATABASE = 'dvna'
                MYSQL_PASSWORD = 'passw0rd'
                MYSQL_HOST = '127.0.0.1'
                MYSQL_PORT = '3306'
            }

            steps {
                sh 'ssh common@192.168.1.7 "export MYSQL_USER=${MYSQL_USER} MYSQL_DATABASE=${MYSQL_DATABASE}"'
                sh 'ssh common@192.168.1.7 "rm -rf dvna && mkdir dvna"'
                sh 'ssh common@192.168.1.7 "pm2 stop all"'
                sh 'scp -r * common@192.168.1.7:~/dvna'
                sh 'ssh common@192.168.1.7 "cd dvna && pm2 start server.js"'
            }
        }
    }
}