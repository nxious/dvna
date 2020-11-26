pipeline {
    agent any
    stages {
        stage ('Deploy to App Server') {
            steps {
                sh 'ssh rahul@192.168.1.5 "ls"'
                sh 'ssh rahul@192.168.1.5 "rm -rf dvna && mkdir dvna"'
                sh 'scp -r * rahul@192.168.1.5:~/dvna'
                sh 'ssh rahul@192.168.1.5 "source ./env.sh"'
                sh 'ssh rahul@192.168.1.5 "npm install"'
                sh 'ssh rahul@192.168.1.5 "npm start"'
            }
        }
    }
}