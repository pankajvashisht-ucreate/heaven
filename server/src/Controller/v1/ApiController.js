const crypto = require('crypto');
const Db = require('../../../libary/sqlBulider');
const DB = new Db();

class ApiController {
  async vaildation(required, non_required) {
    try {
      let message = '';
      let empty = [];
      let table_name = required.hasOwnProperty('table_name')
        ? required.table_name
        : 'users';
      for (let key in required) {
        if (required.hasOwnProperty(key)) {
          if (required[key] == undefined || required[key] == '') {
            empty.push(key);
          }
        }
      }

      if (empty.length != 0) {
        message = empty.toString();
        if (empty.length > 1) {
          message += ' fields are required';
        } else {
          message += ' field is required';
        }
        throw { code: 400, message };
      }

      if (required.hasOwnProperty('checkexist') && required.checkexist === 1) {
        if (required.hasOwnProperty('email')) {
          if (
            await this.checkingAvailability('email', required.email, table_name)
          ) {
            throw 'The Email is already registered. Kindly use another';
          }
        }
        if (required.hasOwnProperty('phone')) {
          if (
            await this.checkingAvailability('phone', required.phone, table_name)
          ) {
            throw 'The Phone No is already registered. Kindly use another';
          }
        }
        if (required.hasOwnProperty('username')) {
          if (
            await this.checkingAvailability(
              'username',
              required.username,
              table_name,
            )
          ) {
            throw 'username already exits';
          }
        }
      }

      let final_data = Object.assign(required, non_required);

      if (final_data.hasOwnProperty('password')) {
        final_data.password = crypto
          .createHash('sha1')
          .update(final_data.password)
          .digest('hex');
      }

      if (final_data.hasOwnProperty('old_password')) {
        final_data.old_password = crypto
          .createHash('sha1')
          .update(final_data.old_password)
          .digest('hex');
      }
      if (final_data.hasOwnProperty('new_password')) {
        final_data.new_password = crypto
          .createHash('sha1')
          .update(final_data.new_password)
          .digest('hex');
      }

      for (let data in final_data) {
        if (final_data[data] == undefined) {
          delete final_data[data];
        } else {
          if (typeof final_data[data] == 'string') {
            final_data[data] = final_data[data].trim();
          }
        }
      }
      return final_data;
    } catch (err) {
      throw err;
    }
  }

  async checkingAvailability(key, value, table_name) {
    let query =
      'select * from ' +
      table_name +
      ' where `' +
      key +
      "` = '" +
      value +
      "' limit 1";
    let data = await DB.first(query);
    if (data.length) {
      return true;
    } else {
      return false;
    }
  }

  addUrl(data, key) {
    if (data.length === 0) {
      return [];
    }
    data.forEach((element, keys) => {
      if (!Array.isArray(key)) {
        data[keys][key] = app.ImageUrl(data[keys][key]);
      } else {
        for (let names of key) {
          if (data[keys][names].length > 0) {
            data[keys][names] = app.ImageUrl(data[keys][names]);
          }
        }
      }
    });
    return data;
  }


  async userDetails(id) {
    return await DB.find('users', 'first', {
      conditions: {
        id: id,
      },
      fields: [
        'id',
        'name',
        'status',
        'email',
        'phone',
        'authorization_key',
        'profile',
        'password',
        'total_amount',
        'country_code',
        'country'
      ],
    });
  }
}

module.exports = ApiController;
