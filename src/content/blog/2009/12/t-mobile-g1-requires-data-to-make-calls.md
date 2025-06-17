---
title: "T-Mobile G1 Requires Data to Make Calls and Send Texts"
description: "A cautionary tale: I took my T-Mobile G1 (aka HTC Dream) on a trip abroad recently. As I didn't want to pay exorbitant data roaming charges, I turned..."
pubDate: 2009-12-04
---

A cautionary tale: I took my T-Mobile G1 (aka HTC Dream) on a trip abroad recently. As I didn't want to pay exorbitant data roaming charges, I turned off all data access on the phone[[1]](#disable_data) before I left for my trip. While abroad I did make a few phone calls and sent and received some text messages. However, upon returning I discovered that my T-Mobile bill **did** have data roaming charges, in addition to the expected voice and text message roaming charges.

The data roaming charges were minor—it was quite obvious that the phone wasn't pulling down its usual smorgasbord of daily data—and surprisingly regular—each of the handful of line items on my bill was a multiple of 0.0244 MB. After much polite arguing with a T-Mobile representative, an explanation emerged: If a data connection is available, the G1 will use it when establishing phone calls and sending text messages. It will do so even if all other data access is disabled on the phone. The T-Mobile rep claimed that this is an optimization that allows the G1 to make a "better" connection to the cell tower. As proof she pointed out that each data roaming line item on my bill matched up with a voice call or text message (this was generally true but did require a bit of squinting with one eye closed for the data to actually match as she claimed).

I'm still a bit skeptical of the explanation I received from T-Mobile. But, while I haven't heard of GSM-based phones sending/receiving data while dealing with voice calls or text messages, it sounds plausible and somewhat matches the tiny amount of data that my phone actually consumed.

[1] Uncheck "Settings > Wireless controls > Mobile networks > Data roaming". For good measure I also turned off background data usage, "Settings > Data synchronization > Background data", and disabled automatic refresh in all installed apps that gave me the option to do so.