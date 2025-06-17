---
title: "Nokia E51 + OS X + T-Mobile"
description: "i got my new nokia e51 setup to access the internet from the phone, paired it with my mac, and got the mac setup to connect to the internet via the ph..."
pubDate: 2008-02-15
updatedDate: 2008-02-16
---

i got my new nokia e51 setup to access the internet from the phone, paired it with my mac, and got the mac setup to connect to the internet via the phone over bluetooth. but every time i tried to connect the mac would complain about not being able to contact the ppp server.

it took me a bit to figure out the one extra step needed. the e51 (and probably other series 60 3rd edition phones) requires you to enter the access point name to be used for tethered connections (i.e. computer via bluetooth) separately from the access point name to be used for connections originating on the phone. even though in practice both of these names are going to be the same.

in short, after everything else you need to do to configure the phone and the laptop for tethered access, go to "Settings > Connection > Packet data > Access point" on the phone and enter "internet2.voicestream.com" (or "internet3.voicestream.com" or whatever access point you're using). this should be the same string as what's under "Settings > Connection > Access points > T-Mobile Internet > Access point name".