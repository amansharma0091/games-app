image: node:6.9.3
before_script:
  - apt-get --quiet update --yes
  - apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1
#  install node js
  - apt-get --quiet install -y build-essential
  - curl -sL http://deb.nodesource.com/setup_6.x | bash -
  - apt-get --quiet install -y nodejs
  - apt-get --quiet update --yes
  - npm -v
  - npm install -g angular-cli
stages:
  - test
  - deploy
#deploy debug
test:
  stage: test
  script:
    - npm install
    - ng build
    - apt-get update -qy
    - apt-get install -y ruby-dev
    - gem install dpl
    - dpl --provider=heroku --app=capp-ci-api-dev --api-key=2c08c676-66ca-40ac-a757-33849bced7a8

  artifacts:
    paths:
    - dist/
#deploy build production
deploy:
  stage: deploy
  script:
    - npm install
    - ng build --prod
    - apt-get update -qy
    - apt-get install -y ruby-dev
    - gem install dpl
    - dpl --provider=heroku --app=capp-ci-api-dev --api-key=2c08c676-66ca-40ac-a757-33849bced7a8

  artifacts:
    paths:
    - dist/
