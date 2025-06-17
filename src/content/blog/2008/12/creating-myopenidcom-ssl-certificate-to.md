---
title: "Creating a myopenid.com SSL certificate to use on your phone"
description: "www.myopenid.com is an OpenID provider that allows logging in via an SSL certificate saved in your web browser rather than by typing in a password. Fr..."
pubDate: 2008-12-12
---

[www.myopenid.com](http://www.myopenid.com/) is an OpenID provider that allows logging in via an SSL certificate saved in your web browser rather than by typing in a password. From a normal web browser you can just click on the "Create Certificate" button on their "Authentication Settings" page and your browser talks to the [myopenid.com](http://www.myopenid.com/) website and gets a certificate that it then stores in its local certificate store.  Unfortunately the web browser in my [Nokia E51](http://en.wikipedia.org/wiki/Nokia_E51) cell phone (a [Series 60 WebKit fork](http://opensource.nokia.com/projects/S60browser/)) doesn't seem to support generating the certificate request when you click on "Create Certificate".

To get around this:

1. Go to the [www.myopenid.com](http://www.myopenid.com/) "Authentication Settings" page from Firefox on your desktop computer. Generate a new certificate like you normally would (except that you probably want to name it after your phone).
2. Once it's done note the serial number listed for the new certificate under the "Manage Your SSL Client Certificates" heading.
3. Then open Firefox preferences and go to "Advanced > Encryption > View Certificates > Your Certificates".
4. Find the *.myopenid.com certificate in the list that has the matching serial number and click "Backup...".
5. Firefox will now prompt you for a file to save the certificate in, a password to protect that file with (you'll have to type this one in on the phone), and maybe your Firefox master password (depending on your settings).
6. Now you have the certificate in a file. Find the file whereever you saved it to and use your favorite method of sending it to the phone. I just sent it via bluetooth but you should also be able to use email, SMS, USB, etc.
7. Open the file on your phone. The phone will prompt you for the password you used to protect the file when you saved it in Firefox.
8. From here the procedure varies by phone. For my S60 3rd Edition FP1 phone, the phone told me that it found one private key and one personal certificate in the file and asked me if I'd like to save them to the phone's key store. Since I hadn't used the phone's key store before, it also asked me to set a password for the key store. Then it saved the certificate and private key.
9. After the above is all done, you can delete the file from your phone and from your computer.
10. Since Firefox should have its own certificate to authenticate to [www.myopenid.com](http://www.myopenid.com/), you can now delete this certificate in Firefox (only the one that you backed up, not all of your *.myopenid.com certificates!) using the aptly-named "Delete..." button.
11. If you now go to [www.myopenid.com](http://www.myopenid.com/) in your phone's web browser and select "Sign in with an SSL certificate", the phone should use the new certificate and you shouldn't need to enter your [www.myopenid.com](http://www.myopenid.com/) password.
12. If you want to verify that the certificate made it to the right place, and you're on a S60 3rd Edition FP1 phone, go to "Tools > Settings > General > Security > Certificate management > Personal certificates". You should see your *.myopenid.com certificate listed there.