// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  encryptionKey: 'Key',
  EndPoint : 'http://ec2-54-211-82-126.compute-1.amazonaws.com:3003',
  client_id: 'zimmet_client',
  grant_type: 'password',
  client_secret: '0cf20930-f5d4-11e7-a6ec-0f3342428867',
  payment_key : 'pk_test_LqvC8xbRt0WGeGIcpdxlZGWT'
};
