# CA Certificate

To use Cyware to intercept (and tamper with) your HTTP/S traffic, it is necessary to import and trust the CA Certificate of Cyware in your browser.

## Importing the CA Certificate in Your Browser

1. After starting Cyware on your machine, navigate to `localhost:8080` (or the port you've configured for Cyware to listen to) and log in.

<img alt="User dropdown." src="/_images/import_cert_config.png" center/>

2. Click on your account icon in the upper-rightmost corner of the Cyware window.
3. Select `CA Certificate` tab or navigate to [http://localhost:8080/#/settings/certificate](http://localhost:8080/#/settings/certificate).

<img alt="Downloading the CA Certificate." src="/_images/cert_instructions_new.png" center/>

4. Download the certificate and follow the importation instructions provided within Cyware. After you've successfully imported the certificate, your browser is now configured to proxy it's traffic through Cyware.

::: tip
Ensure to select the importation instructions specific to your browser of choice.
:::
