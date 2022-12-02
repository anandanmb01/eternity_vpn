# SoftEther VPN Client (Ver 4.41, Build 9782, Intel x64 / AMD64) for Linux
# Makefile
# 
# Copyright (c) SoftEther VPN Project at University of Tsukuba, Japan. All Rights Reserved.
# Platform: linux-x86-64bit

CC=gcc


OPTIONS=-fPIE -O2 -fsigned-char -pthread -m64 -lm -lrt -lpthread -L./ lib/libssl.a lib/libcrypto.a lib/libiconv.a lib/libcharset.a lib/libedit.a lib/libncurses.a lib/libz.a lib/libintelaes.a -ldl

default:
	@./.install.sh

# NOTE:
# You have to read and agree the license agreement at the same directory
#  before using this software.

main:
	@echo "Preparing SoftEther VPN Client..."
	-ranlib lib/libcharset.a
	-ranlib lib/libcrypto.a
	-ranlib lib/libedit.a
	-ranlib lib/libiconv.a
	-ranlib lib/libintelaes.a
	-ranlib lib/libncurses.a
	-ranlib lib/libssl.a
	-ranlib lib/libz.a
	-ranlib code/vpnclient.a
	$(CC) code/vpnclient.a $(OPTIONS) -o vpnclient
	-ranlib code/vpncmd.a
	$(CC) code/vpncmd.a $(OPTIONS) -o vpncmd
	@echo
	@echo "--------------------------------------------------------------------"
	@echo "The preparation of SoftEther VPN Client is completed !"
	@echo
	@echo
	@echo "*** How to switch the display language of the SoftEther VPN Client Service ***"
	@echo "SoftEther VPN Client supports the following languages:"
	@echo "  - Japanese"
	@echo "  - English"
	@echo "  - Simplified Chinese"
	@echo
	@echo "You can choose your prefered language of SoftEther VPN Client at any time."
	@echo "To switch the current language, open and edit the 'lang.config' file."
	@echo
	@echo
	@echo "Note: the administrative password is not set on the VPN Server. Please set your own administrative password as soon as possible by vpncmd or the GUI manager."
	@echo
	@echo
	@echo "*** How to start the SoftEther VPN Client Service ***"
	@echo
	@echo "Please execute './vpnclient start' to run the SoftEther VPN Client Background Service."
	@echo "And please execute './vpncmd' to run the SoftEther VPN Command-Line Utility to configure SoftEther VPN Client."
	@echo
	@echo "Of course, you can use the VPN Server Manager GUI Application for Windows / Mac OS X on the other Windows / Mac OS X computers in order to configure the SoftEther VPN Client remotely."
	@echo
	@echo "*** For Windows users ***"
	@echo "You can download the SoftEther VPN Server Manager for Windows"
	@echo "from the http://www.softether-download.com/ web site."
	@echo "This manager application helps you to completely and easily manage the VPN server services running in remote hosts."
	@echo
	@echo
	@echo "*** For Mac OS X users ***"
	@echo "In April 2016 we released the SoftEther VPN Server Manager for Mac OS X."
	@echo "You can download it from the http://www.softether-download.com/ web site."
	@echo "VPN Server Manager for Mac OS X works perfectly as same as the traditional Windows versions. It helps you to completely and easily manage the VPN server services running in remote hosts."
	@echo
	@echo
	@echo
	@echo "*** PacketiX VPN Server HTML5 Web Administration Console (NEW) ***"
	@echo "This VPN Server / Bridge has the built-in HTML5 Web Administration Console."
	@echo
	@echo "After you start the server daemon, you can open the HTML5 Web Administration Console is available at"
	@echo
	@echo "https://127.0.0.1:5555/"
	@echo "or"
	@echo "https://ip_address_of_the_vpn_server:5555/"
	@echo
	@echo "This HTML5 page is obviously under construction, and your HTML5 development contribution is very appreciated."
	@echo
	@echo "--------------------------------------------------------------------"
	@echo

clean:
	rm -f vpnclient
	rm -f vpncmd

