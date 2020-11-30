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
                sh '''
                    ssh common@192.168.1.7 "cd dvna && pm2 stop server.js"
                    ssh common@192.168.1.7 "rm -rf dvna && mkdir dvna"
                    scp -r * common@192.168.1.7:~/dvna
                    ssh common@192.168.1.7 "cd dvna && pm2 start ecosystem.config.js'"
                '''
            }
        }
    }
}