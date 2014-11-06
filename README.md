# VirtKick prototype

[![GPA](https://img.shields.io/codeclimate/github/virtkick/virtkick-prototype.svg?style=flat-square)](https://codeclimate.com/github/virtkick/virtkick-prototype)
[![Build status](https://img.shields.io/travis/virtkick/virtkick-prototype.svg?style=flat-square)](https://travis-ci.org/virtkick/virtkick-prototype)
[![Dependencies status](http://img.shields.io/gemnasium/virtkick/virtkick-prototype.svg?style=flat-square)](https://gemnasium.com/virtkick/virtkick-prototype)
[![Gratipay](https://img.shields.io/gratipay/virtkick.svg?style=flat-square)](https://gratipay.com/virtkick/)

This is a prototype of VirtKick webapp, a 1-click cloud management center.
It's built with [Middleman](http://middlemanapp.com/).
Visit [demo.virtkick.io](https://demo.virtkick.io/) to preview.

The sources are licensed under GNU AGPLv3 or later, unless otherwise stated.
See [LICENSE.md](https://github.com/virtkick/virtkick-prototype/blob/master/LICENSE.md).

<p align="center">
  <a href="https://www.indiegogo.com/projects/virtkick-take-cloud-back">
    <img src="https://raw.github.com/virtkick/virtkick/master/indiegogo.png" />
  </a>
</p>

## Disclaimer

This is MVP - a minimum viable product. We don't code like what you see in this repository! The [real webapp](https://github.com/virtkick/virtkick-webapp) is well-crafted with AngularJS and Rails.

## Requirements

- [RVM](https://rvm.io/)
- Ruby 2.1 from RVM
- Linux or Mac

### One time setup

```
rvm install 2.1
rvm use 2.1 --default
gem install bundler
```

### Development

```
bundle install
bundle exec middleman server
xdg-open http://0.0.0.0:4567/  # in a new tab
```

### Deployment

```
bundle exec middleman build
```

## Contributing

See [CONTRIBUTING.md](https://github.com/virtkick/virtkick-prototype/blob/master/CONTRIBUTING.md). Thanks!

# Sponsors

- Tip us weekly with Gratipay: [![Donate with Gratipay](https://img.shields.io/gratipay/virtkick.svg?style=flat-square)](https://gratipay.com/virtkick/)
- One-time donate with PayPal: [![Donate with PayPal](https://raw.githubusercontent.com/virtkick/virtkick/master/paypal-donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AGF4FPG7JZ7NY&lc=US)
- Or with Bitcoins: `1Nb7PxyNAKSNc6traXW4NPyPMhJA7PwXf8`
- [Become a corporate sponsor](https://www.virtkick.io/become-a-sponsor.html).

Thanks for your support!

# License

VirtKick, a simple orchestrator.
Copyright (C) 2014 StratusHost Damian Nowak

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see https://www.gnu.org/licenses/agpl-3.0.html.


# Trademark

The VirtKick name and logo are trademarks of Damian Nowak.
You may not use them for promotional purposes,
or in any way that claims, suggests or looks like
there's a relationship or endorsement by VirtKick.

Other marks and names mentioned herein may be trademarks of their respective companies.
