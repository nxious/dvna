pipeline {
    agent any
    stages {
        stage ('Deploy to App Server') {
            steps {
                sh 'ssh rahul@192.168.1.5 -p hoon123123'
                sh 'cd dvna'
                sh 'source ./env.sh'
                sh 'npm install'
                sh 'npm start'
            }
        }
    }
}