
# Gelukszaaiers API

## Description

Gelukszaaiers API

## Installation

```bash
$ yarn
```

### Set up database
```bash
$ docker-compose up -d postgres
```

When error ```permission denied to create extension "uuid-ossp"``` occurs
```bash
$ docker-compose exec postgres psql -U postgres dev
$ CREATE EXTENSION "uuid-ossp";
```

## Start

```
$ yarn start
```