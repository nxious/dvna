pipeline {
    agent any
    stages {
        stage ('Building the application') {
            steps {
                sh 'ls'
            }
        }

        stage ('Deploying the application') {
            steps {
                sh 'ssh common@192.168.1.7 "ls"'
                sh 'ssh common@192.168.1.7 "rm -rf dvna && mkdir dvna"'
                sh 'scp -r * common@192.168.1.7:~/dvna'
                sh 'ssh common@192.168.1.7 "source ./env.sh"'
                sh 'ssh common@192.168.1.7 "npm start"'
            }
        }
    }
}