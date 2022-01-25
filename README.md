# Trojan-AF

An educational malware to illustrate the importance of emerging applications security for the core networks.

## Features

- Use IRC as C&C server
- Information collection of core network
  - The network interfaces of the host running the malware
  - Online hosts in the same network and their public ports
  - Retrieve the service endpoints of NFs from NRF
- Core network interference
  - Force PDU session to release
  - Remote shell

## Dependency

- An IRC server (e.g. [InspIRCd](https://github.com/inspircd/inspircd))
- [Node.js](https://nodejs.org/en/) >= 16.13.0
- [Nmap](https://nmap.org/)

## Installation

- For Ubuntu 20.04 LTS

```bash
sudo apt install -y inspircd nmap
# You need to install Node.js manually

git clone https://github.com/nuk-icslab/trojan-af.git
cd trojan-af
npm install
```

## Usage

- The malware will connect to a IRC server by default
- You can join the channel #5gsvc to command this bot
- Available commands are:

```plain
!help  : Show this message.
!iface  : List the interfaces of this host.
!nmap {hosts} [ports] : Scan the subnet.
!nrf {NRF URI} : Retrieve services of NFs from NRF.
!kill-pdu {SMF URI} [smContextRef] : Release the SM context form SMF.
!exec {command} [args] : Run the command in a shell.
```
