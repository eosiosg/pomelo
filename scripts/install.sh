#!/bin/sh

yarn install

npm run rnnodeify

cd ios

pod install

cd ../

sed -i '' "s/require('isomorphic-fetch');/\/\/require('isomorphic-fetch');/g" ./node_modules/eosjs-api/lib/apigen.js

sed -i '' "s/var protocol = isBrowser/var protocol = 'http';\/\/var protocol = isBrowser/g" ./node_modules/eosjs-api/lib/testnet.js
#/Users/xiechao/codes/eos-wallet-app/node_modules/eosjs-api/lib/apigen.js

#sed -i '' '31 s/@Override/\/\/@Override \/\/ Deprecated RN 0.47/g' ./node_modules/react-native-os/android/src/main/java/com/peel/react/RNOSModule.java
#
#sed -i '' '7 s/defaultConfig {/defaultConfig { manifestPlaceholders = [XG_ACCESS_ID: "2100279540", XG_ACCESS_KEY: "A51MF2N9C2IR", HW_APPID: "100243781"]\/\//g' ./node_modules/react-native-xinge-push/android/build.gradle
#
#sed -i '' "s/var scrypt = require('scrypt-js');/import crypto from 'react-native-fast-crypto';/g" ./node_modules/ethers/wallet/secret-storage.js
#sed -i '' "s/scrypt(/crypto.scrypt_1(/g" ./node_modules/ethers/wallet/secret-storage.js
#
#
#sed -i '' "s/var scrypt = require('scrypt-js');/import crypto from 'react-native-fast-crypto';/g" ./node_modules/ethers/dist/ethers.js
#sed -i '' "s/scrypt(/crypto.scrypt_1(/g" ./node_modules/ethers/dist/ethers.js
#
#sed -i '' "s/var scrypt = require('scrypt-js');/import crypto from 'react-native-fast-crypto';/g" ./node_modules/ethers/wallet/wallet.js
#sed -i '' "s/scrypt(/crypto.scrypt_1(/g" ./node_modules/ethers/wallet/wallet.js