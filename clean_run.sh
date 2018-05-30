
rm -rf node_modules
rm -rf /ios/build
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*
yarn install2
react-native run-ios  --simulator="iPhone 8"
