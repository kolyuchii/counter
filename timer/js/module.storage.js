/**
 * Работа с localStorage
 *
 */

App.modules.storage = function () {
    'use strict';

    var storage = window.localStorage;

    function serialize (value) {
        return typeof value === 'string' ? value : JSON.stringify(value);
    }

    function deserialize (value) {
        return (/^\[|{.{3,}}|\]$/.test(value) ? JSON.parse(value) : value);
    }

    function set (key, value) {
        if (value !== undefined) {
            storage.setItem(key + '', serialize(value));

            return true;
        } else if (value === null) {
            remove(key + '');
        }

        return false;
    }

    function get (key) {
        return deserialize(storage.getItem(key + ''));
    }

    function getAll () {
        var items = {};

        for (var key in storage) {
            items[key + ''] = storage.getItem(key + '');
        }
        return items;
    }

    function remove (key) {
        if (typeof key === 'string') {
            storage.removeItem(key);

            return true;
        }

        return false;
    }

    function clear () {
        storage.clear();

        return true;
    }

    function update (key, data) {
        if (key && typeof data === 'object') {
            set(key, _.merge(get(key) || {}, data));

            return true;
        }

        return false;
    }

    return {
        update: update,

        // Получить одну запись по ключу
        get: get,

        getAll: getAll,

        // Создать запись
        set: set,

        // Очистить всё
        clear: clear,

        // Удалить запись по ключу
        remove: remove
    };
};