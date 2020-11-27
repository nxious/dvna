pipeline {
    agent any
    stages {
        stage ('Building the application') {
            steps {
                sh 'export MYSQL_USER=root'
                sh 'export MYSQL_DATABASE=dvna'
                sh 'export MYSQL_PASSWORD=passw0rd'
                sh 'export MYSQL_HOST=127.0.0.1'
                sh 'export MYSQL_PORT=3306'
                sh 'npm install'
            }
        }

        stage ('Deploying the application') {
            steps {
                sh 'ssh common@192.168.1.7 "rm -rf dvna && mkdir dvna"'
                sh 'scp -r * common@192.168.1.7:~/dvna'
                sh 'ssh common@192.168.1.7 "npm start"'
            }
        }
    }
}