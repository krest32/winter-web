//gitlab的凭证
def git_auth = "36a8360b-3146-4bb6-8d6a-d3ef39be5d57"
node {
 stage('拉取代码') {
   checkout([$class: 'GitSCM', branches: [[name: '*/${branch}']],doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [],userRemoteConfigs: [[credentialsId: "${git_auth}", url:'https://gitee.com/krest202/winter-web.git']]])
 }
 stage('打包，部署网站') {
   //使用NodeJS的npm进行打包
   nodejs('nodejs12'){
  	sh '''
  		npm install
        npm run dev
      '''
 }
}