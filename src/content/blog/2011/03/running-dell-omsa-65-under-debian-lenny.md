---
title: "Running Dell OMSA 6.5 under Debian Lenny"
description: "Following on from my earlier post about OMSA 6.3, here are updated instructions for OMSA 6.5 on Lenny. If you've read the earlier post, here's what's..."
pubDate: 2011-03-30
updatedDate: 2011-06-02
---

Following on from [my earlier post about OMSA 6.3](../../../2010/12/running-dell-omsa-63-under-debian-lenny/), here are updated instructions for OMSA 6.5 on Lenny. If you've read the earlier post, here's what's new:

- Of course, targets OMSA 6.5 instead of 6.3. The only meaningful change in the process is that there's no more need to hack around the smbios package dependencies.
- I opted to use schroot to make a few things easier. You can still use plain chroot if you'd prefer, but the necessary changes to my instructions are left as an exercise for the reader.
- Added notes on a pure 32-bit install.
- I ran into some issues upgrading from OMSA 6.3 to 6.5. So I completely removed the old 6.3 installation and installed 6.5 from scratch. If upgrading (via the usual "apt-get update && apt-get dist-upgrade" sequence inside the chroot) works for you, please let me know in the comments.

As before, the OMSA packages target Ubuntu 9.10. The good news is they now target Debian Squeeze as well (using the same packages). Unfortunately the packages have a few dependencies on libraries that only exist in Debian Squeeze and not in Debian Lenny. Rather than doing lots of backporting, the easiest solution is to create a Squeeze chroot and run OMSA from there.

Below are instructions for getting these packages to run under a Debian Lenny i386 system that is using an x86_64 kernel. Note that Dell now provides 32-bit OMSA packages as well. However, they will only work if your system is completely 32-bit (i.e. 32-bit userland AND 32-bit kernel). I am running 32-bit userland with a 64-bit kernel, so I still had to install the 64-bit versions of the packages. If you are running a completely 32-bit Lenny system, the below instructions should mostly still work (though I haven't tried this combination). You'll just need to substitute "i386" everywhere you see "amd64".

<br/>

The instructions assume that the amd64 chroot will be under /srv/squeeze-amd64.

1. If you have the old OMSA packages from sara.nl installed, remove those packages and all related configuration files first. E.g.: `apt-get --purge remove dellomsa`.
2. Make sure you have the Debian squeeze (aka stable) and lenny-backports repositories configured in apt. lenny-backports is only needed for schroot, so you can skip it if you won't be using schroot.
3. `apt-get install debootstrap/stable schroot/lenny-backports`
4. `debootstrap --arch amd64 squeeze /srv/squeeze-amd64`
5. Configure schroot:
    ```sh
    cat <<EOF > /etc/schroot/chroot.d/squeeze-amd64
    [squeeze-amd64]
    type=directory
    description=Debian squeeze (testing) amd64
    directory=/srv/squeeze-amd64
    script-config=squeeze-amd64/config
    EOF

    mkdir /etc/schroot/squeeze-amd64

    cat <<EOF > /etc/schroot/squeeze-amd64/config
    FSTAB="/etc/schroot/squeeze-amd64/fstab"
    COPYFILES="/etc/schroot/squeeze-amd64/copyfiles"
    NSSDATABASES="/etc/schroot/squeeze-amd64/nssdatabases"
    EOF

    cat <<EOF > /etc/schroot/squeeze-amd64/copyfiles
    /etc/resolv.conf
    /etc/passwd
    /etc/shadow
    /etc/group
    /etc/gshadow
    EOF

    cat <<EOF > /etc/schroot/squeeze-amd64/fstab
    /proc           /proc           none    rw,rbind        0       0
    /sys            /sys            none    rw,rbind        0       0
    /dev            /dev            none    rw,rbind        0       0
    /tmp            /tmp            none    rw,bind         0       0
    # /lib/modules is needed because the OMSA init scripts try to figure
    # out if the dell_rbu kernel module is available for the current kernel
    # or needs to be compiled
    /lib/modules    /lib/modules    none    rw,bind         0       0
    EOF

    echo "hosts" > /etc/schroot/squeeze-amd64/nssdatabases
    ```
6. Start the schroot session: `schroot -b -c "squeeze-amd64" -n "squeeze-amd64"`
7. Configure Debian and Dell repositories and make sure all packages are up-to-date:
    ```sh
    cat <<EOF > /srv/squeeze-amd64/etc/apt/sources.list
    deb http://mirrors.kernel.org/debian/ squeeze main non-free contrib
    deb http://security.debian.org/ squeeze/updates main non-free contrib
    deb http://linux.dell.com/repo/community/deb/latest /
    EOF

    schroot -r -c squeeze-amd64 -- apt-key adv --keyserver pgpkeys.mit.edu --recv-key E74433E25E3D7775
    schroot -r -c squeeze-amd64 -- apt-get update
    schroot -r -c squeeze-amd64 -- apt-get upgrade
    ```
8. Now install OMSA packages. There are other bundles available, but I only used:
    ```sh
    schroot -r -c squeeze-amd64 -- apt-get install srvadmin-base srvadmin-storageservices srvadmin-rac5`
    ```
9. The OMSA packages pull in snmpd. If you don't want/need SNMP, disable it:
    ```sh
    schroot -r -c squeeze-amd64 -- /etc/init.d/snmpd stop
    sed -ie 's/^SNMPDRUN=yes.*/SNMPDRUN=no/' /srv/squeeze-amd64/etc/default/snmpd
    schroot -r -c squeeze-amd64 -- /etc/init.d/dataeng disablesnmp
    ```
10. Start OMSA in the chroot. If this step fails, figure out what went wrong before proceeding:
    ```sh
    schroot -r -c squeeze-amd64 /etc/init.d/instsvcdrv start
    schroot -r -c squeeze-amd64 /etc/init.d/dataeng start
    ```
11. Create wrappers so that OMSA init scripts are run during bootup:
    ```sh
    cat <<EOF > /usr/local/bin/squeeze-amd64
    #!/bin/bash
    CHROOT="squeeze-amd64"
    if ! schroot -l -c "session:${CHROOT}" >/dev/null 2>&1 ; then
      schroot -b -c "${CHROOT}" -n "${CHROOT}"
    fi
    command="$0"
    exec schroot -r -c "${CHROOT}" -- "${command}" "$@"
    EOF

    chmod 755 /usr/local/bin/squeeze-amd64
    ln -s /usr/local/bin/squeeze-amd64 /etc/init.d/dataeng
    ln -s /usr/local/bin/squeeze-amd64 /etc/init.d/instsvcdrv

    update-rc.d dataeng defaults 20 19
    update-rc.d instsvcdrv defaults 19 20
    ```
12. (Optional) To make running OMSA commands easier, you can also create symlinks from commands in /opt/dell/srvadmin/bin to /usr/local/bin/squeeze-amd64. E.g.: `install -d -m755 /opt/dell/srvadmin/bin; ln -s /usr/local/bin/squeeze-amd64 /opt/dell/srvadmin/bin/omreport`.

Some related links:

- [Dell documentation on the OMSA packages](http://linux.dell.com/repo/community/deb/latest/)
- [A script that is similar to the procedure above](https://github.com/gmaurice/DellOMSA-Lenny) (and is based on my earlier 6.3 instructions). I haven't used this script, but it looks like it should work. There are a few differences with the instructions I provide, but the basic approach is the same.