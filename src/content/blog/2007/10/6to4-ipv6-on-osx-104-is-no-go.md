---
title: "6to4 IPv6 on OSX 10.4 is a no-go"
description: "you'd think something like this would've been caught before release, but it turns out that all current versions of osx 10.4 have a byte order bug that..."
pubDate: 2007-10-19
---

you'd think something like this would've been caught before release, but it turns out that all current versions of osx 10.4 have a byte order bug that causes 6to4 tunnels to be setup with the wrong address. when the machine's ipv4 address is converted to an ipv6 6to4-style address, osx incorrectly reverses the bytes, resulting in a useless address :(

[more info at apple's ipv6 list](http://lists.apple.com/archives/ipv6-dev/2007/Sep/msg00000.html)