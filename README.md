# Southport Robo Command and Control

> Control robots with a DS4 controller and a cellphone!

This demo will serve as a jumping off pointer for building a command-and-control system for remote deployed robots, allowing for flexible systems to be added on top of it.

## Requirements

1. NodeJS >= 12.13 LTS [Link](https://nodejs.org/en/)
2. A USB or Bluetooth controller (e.g. Dualshock 4 controller)
3. An arduino with the Firmata firmare [Link](https://github.com/firmata/arduino)
4. Serial Communication Permission on host machine (root if on pi)

## Installation

```bash
npm install
```

## Deployment

```bash
sudo npm run server
```