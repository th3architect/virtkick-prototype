# VirtKick prototype

[![GPA](https://img.shields.io/codeclimate/github/virtkick/virtkick-prototype.svg)](https://codeclimate.com/github/virtkick/virtkick-prototype)
[![Build status](https://img.shields.io/travis/virtkick/virtkick-prototype.svg)](https://travis-ci.org/virtkick/virtkick-prototype)
[![Dependencies status](http://img.shields.io/gemnasium/virtkick/virtkick-prototype.svg)](https://gemnasium.com/virtkick/virtkick-prototype)

This is a prototype of VirtKick webapp, a 1-click cloud management center.
It's built with [Middleman](http://middlemanapp.com/).
Visit [demo.virtkick.io](https://demo.virtkick.io/) to preview.

The sources are licensed under GNU AGPLv3 or later, unless otherwise stated.
See [LICENSE.md](https://github.com/virtkick/virtkick-prototype/blob/master/LICENSE.md).

## Disclaimer

This is MVP - a minimum viable product. I don't code like what you see in this repository!
The real webapp will be well-crafted with AngularJS.

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
