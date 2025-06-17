---
title: "Numbers everyone should know"
description: "\"Numbers everyone should know\", courtesy of Jeff Dean: * L1 cache reference                              0.5 ns * Branch mispredict..."
pubDate: 2009-06-20
---

"Numbers everyone should know", [courtesy of Jeff Dean](http://research.google.com/people/jeff/stanford-295-talk.pdf):

```

* L1 cache reference                              0.5 ns
* Branch mispredict                               5 ns
* L2 cache reference                              7 ns
* Mutex lock/unlock                             100 ns
* Main memory reference                         100 ns
* Compress 1K bytes with Zippy               10,000 ns
* Send 2K bytes over 1 Gbps network          20,000 ns
* Read 1 MB sequentially from memory        250,000 ns
* Round trip within same datacenter         500,000 ns
* Disk seek                              10,000,000 ns
* Read 1 MB sequentially from network    10,000,000 ns
* Read 1 MB sequentially from disk       30,000,000 ns
* Send packet CA->Netherlands->CA       150,000,000 ns

```

Similarly (and courtesy of Jeff Dean and Sean Quinlan), "The Joys of Real Hardware" lists the typical problems a new cluster will experience in its first year:

- ~0.5 _overheating_ (power down most machines in <5 mins, ~1-2 days to recover)
- ~1 _PDU failure_ (~500-1000 machines suddenly disappear, ~6 hours to come back)
- ~1 _rack-move_ (plenty of warning, ~500-1000 machines powered down, ~6 hours)
- ~1 _network rewiring_ (rolling ~5% of machines down over 2-day span)
- ~20 _rack failures_ (40-80 machines instantly disappear, 1-6 hours to get back)
- ~5 _racks go wonky_ (40-80 machines see 50% packet loss)
- ~8 _network maintenances_ (4 might cause ~30-minute random connectivity losses)
- ~12 _router reloads_ (takes out DNS and external vips for a couple minutes)
- ~3 _router failures_ (have to immediately pull traffic for an hour)
- ~dozens of minor _30-second blips for dns_
- ~1000 _individual machine failures_
- ~thousands of _hard drive failures_

in addition to "_slow disks, bad memory, misconfigured machines, flaky machines_, etc.".