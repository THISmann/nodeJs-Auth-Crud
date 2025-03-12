// pipeline {
//     agent any

//     environment {
//         SONARQUBE_URL = 'http://localhost:9000'
//         SONARQUBE_TOKEN = credentials('sonarqube-token')  // Add this in Jenkins credentials
//         TRIVY_REPORT = 'trivy-report.json'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git credentialsId: 'github-credentials', url: 'https://github.com/THISmann/nodeJs-Auth-Crud.git', branch: 'main'
//             }
//         }

//         stage('Dependency Security Scan with Trivy') {
//             steps {
//                 script {
//                     sh '''
//                     trivy fs --format json -o $TRIVY_REPORT .
//                     '''
//                 }
//             }
//         }

//         stage('Code Analysis with SonarQube') {
//             steps {
//                 script {
//                     withSonarQubeEnv('SonarQube') {
//                         sh '''
//                         sonar-scanner \
//                           -Dsonar.projectKey=nodejs-app \
//                           -Dsonar.sources=. \
//                           -Dsonar.host.url=$SONARQUBE_URL \
//                           -Dsonar.login=$SONARQUBE_TOKEN
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Publish Trivy Results') {
//             steps {
//                 script {
//                     publishHTML(target: [
//                         reportDir: '',
//                         reportFiles: 'trivy-report.json',
//                         reportName: 'Trivy Security Report'
//                     ])
//                 }
//             }
//         }

//         stage('SonarQube Quality Gate') {
//             steps {
//                 timeout(time: 5, unit: 'MINUTES') {
//                     waitForQualityGate abortPipeline: true
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             archiveArtifacts artifacts: '**/trivy-report.json', fingerprint: true
//         }
//     }
// }


// node {
//   stage('SCM') {
//     checkout scm
//   }
//   stage('SonarQube Analysis') {
//     def scannerHome = tool 'SonarScanner';
//     withSonarQubeEnv() {
//       sh "${scannerHome}/bin/sonar-scanner"
//     }
//   }
// }

pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/THISmann/nodeJs-Auth-Crud']])
            }
        }
    }
}
