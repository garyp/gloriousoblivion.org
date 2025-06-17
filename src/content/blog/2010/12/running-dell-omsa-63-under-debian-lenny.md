---
title: "Running Dell OMSA 6.3 under Debian Lenny"
description: "UPDATE: I've posted updated instructions for the new OMSA 6.5 packages.  Earlier this year Dell finally announced a version of their OpenManage Server..."
pubDate: 2010-12-12
updatedDate: 2011-03-30
---

**UPDATE**: I've posted [updated instructions for the new OMSA 6.5 packages](../../../2011/03/running-dell-omsa-65-under-debian-lenny/).

Earlier this year [Dell finally announced a version of their OpenManage Server Administrator suite for Ubuntu systems](http://en.community.dell.com/dell-blogs/enterprise/b/tech-center/archive/2010/07/27/dell-openmanage-6-3-for-ubuntu.aspx). This means that there's now an officially-maintained version of OMSA compiled and packaged for a Debian-like system. There are two main limitations with the current release, as it relates to Debian: 1) It's compiled for Ubuntu 9.10, which while pretty similar to Debian Lenny, does introduce some problems when trying to install these packages on Debian; and 2) Only amd64 packages were released.

Below are instructions for getting these packages to run under a Debian Lenny i386 system that is using an x86_64 kernel (if your Dell system doesn't support a 64-bit kernel then you won't be able to run these OMSA packages). Unfortunately the packages have a few dependencies on libraries that only exist in Debian Squeeze and not in Debian Lenny. Rather than doing lots of backporting, the easiest solution is to create a Squeeze chroot and run OMSA from there.

The instructions assume that the amd64 chroot will be under /srv/squeeze-amd64. Note also that these instructions were cobbled together from my notes as I did this. There might be typos or small mistakes in the flow.

1. If you have the old OMSA packages from sara.nl installed, remove those packages and all related configuration files first. E.g.: `apt-get --purge remove dellomsa`.
2. Make sure you have the Debian testing (aka squeeze) repository configured in apt.
3. `apt-get install debootstrap/testing`
4. `debootstrap --arch amd64 squeeze /srv/squeeze-amd64`
5. Copy files that might be needed into the chroot. You can probably get away with just /etc/resolv.conf and /etc/hosts, though you might want to copy /etc/passwd, /etc/group, /etc/shadow, and /etc/gshadow as well if you want accounts in the chroot to be the same as the base system.
6. Add the following entries to /etc/fstab (/lib/modules is needed because the OMSA init scripts try to figure out if the dell_rbu kernel module is available for the current kernel or needs to be compiled):
    ```
    /proc /srv/squeeze-amd64/proc none rw,rbind 0 0
    /sys /srv/squeeze-amd64/sys none rw,rbind 0 0
    /dev /srv/squeeze-amd64/dev none rw,rbind 0 0
    /tmp /srv/squeeze-amd64/tmp none rw,bind 0 0
    /lib/modules /srv/squeeze-amd64/lib/modules none rw,bind 0 0
    ```
7. Mount the above filesystems.
8. Make sure all packages are up-to-date:
    ```sh
    cat <<EOF > /srv/squeeze-amd64/etc/apt/sources.list
    deb http://mirrors.kernel.org/debian/ squeeze main non-free contrib
    deb http://security.debian.org/ squeeze/updates main non-free contrib
    EOF
     
    chroot /srv/squeeze-amd64 apt-get update
    chroot /srv/squeeze-amd64 apt-get -f install
    chroot /srv/squeeze-amd64 apt-get upgrade
    ```
9. The Dell OMSA packages depend on the smbios-utils package. In Debian this package is called libsmbios-bin. Worse, the Debian package is too old and doesn't have certain binaries required by the Dell tools. So you have to manually install the Ubuntu version of smbios-utils and python-libsmbios. Any Ubuntu release starting with 9.10 should work, but I've used the packages from 10.04LTS since it is an LTS release and will be supported longer.
    ```sh
    chroot /srv/squeeze-amd64 wget -P /var/tmp http://mirrors.us.kernel.org/ubuntu//pool/universe/libs/libsmbios/smbios-utils_2.2.13-0ubuntu4.1_amd64.deb
    chroot /srv/squeeze-amd64 wget -P /var/tmp http://mirrors.us.kernel.org/ubuntu//pool/universe/libs/libsmbios/python-libsmbios_2.2.13-0ubuntu4.1_all.deb
    chroot /srv/squeeze-amd64 dpkg --install /var/tmp/python-libsmbios_2.2.13-0ubuntu4.1_all.deb /var/tmp/smbios-utils_2.2.13-0ubuntu4.1_amd64.deb
    chroot /srv/squeeze-amd64 apt-get -f install
    ```
10. Now install OMSA packages. There are other bundles available, but I only used: `chroot /srv/squeeze-amd64 apt-get install srvadmin-base srvadmin-storageservices srvadmin-rac5`
11. The OMSA packages pull in snmpd. If you don't want/need SNMP, disable it:
    1. `chroot /srv/squeeze-amd64 /etc/init.d/snmpd stop`
    2. Set SNMPDRUN=no in /srv/squeeze-amd64/etc/default/snmpd.
    3. `chroot /srv/squeeze-amd64 /etc/init.d/dataeng disablesnmp`
12. Start OMSA in the chroot. If this step fails, figure out what went wrong before proceeding:
    ```sh
    chroot /srv/squeeze-amd64 /etc/init.d/instsvcdrv start
    chroot /srv/squeeze-amd64 /etc/init.d/dataeng start
    ```
13. Create wrappers so that OMSA init scripts are run during bootup:
    ```sh
    cat <<EOF > > /usr/local/bin/squeeze-amd64
    #!/bin/bash
    exec chroot /srv/squeeze-amd64 "$0" "$@"
    EOF

    chmod 755 /urs/local/bin/squeeze-amd64
    ln -s /usr/local/bin/squeeze-amd64 /etc/init.d/dataeng
    ln -s /usr/local/bin/squeeze-amd64 /etc/init.d/instsvcdrv

    update-rc.d dataeng defaults 20 19
    update-rc.d instsvcdrv defaults 19 20
    ```
14. (Optional) To make running OMSA commands easier, you can also create symlinks from commands in /opt/dell/srvadmin/bin to /usr/local/bin/squeeze-amd64. E.g.: `install -d -m755 /opt/dell/srvadmin/bin; ln -s /usr/local/bin/squeeze-amd64 /opt/dell/srvadmin/bin/omreport`.