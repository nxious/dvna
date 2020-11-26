pipeline {
    agent any
    stages {
        stage ('Deploy to App Server') {
            steps {
                sh 'export MYSQL_USER=root'
                sh 'export MYSQL_DATABASE=dvna'
                sh 'export MYSQL_PASSWORD=hoon123123'
                sh 'export MYSQL_HOST=127.0.0.1'
                sh 'export MYSQL_PORT=3306'
                sh 'ssh rahul@192.168.1.5'
                sh 'ls'
                sh 'source ./env.sh'
                sh 'npm install'
                sh 'npm start'
            }
        }
    }
}