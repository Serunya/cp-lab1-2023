import {Cache} from "../src/cache";



test('cache stores key value', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    expect(cache.get('key1')).toBe('value1'); // Исправленный вызов
    expect(cache.get('key2')).toBe('value2');
});

test('cache stores set pair count access', () => {
    const cache = new Cache();
    cache.set('key1', 'value1', 4);
    expect(cache.access('key1')).toBe(4);
});

test('should decrement access count on each access', () => {
    const cache = new Cache();
    cache.set('key1', 'value1', 4);
    cache.get('key1');
    expect(cache.access('key1')).toBe(3);
});

test('should return null if key does not exist', () => {
    const cache = new Cache();
    expect(cache.get('NonExistingKey')).toBeNull();
});

test('should return null if key access count is 0', () => {
    const cache = new Cache();
    cache.set('key2', 'value2', 0);
    expect(cache.access('key2')).toBeNull(); 
});

test('if pair is not set count access, this set 1', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    expect(cache.access('key1')).toBe(1);
});

test('should provide statistics of cache with remaining access counts', () => {
    const cache = new Cache();
    cache.set('key4', 'value4', 3);
    cache.set('key5', 'value5', 2);
    expect(cache.pairs()).toEqual([
        { key: 'key4', value: 'value4', remaining: 3 },
        { key: 'key5', value: 'value5', remaining: 2 },
    ]);
});

test('should remove key when access count reaches 0', () => {
    const cache = new Cache();
    cache.set('key6', 'value6', 1);
    cache.get('key6'); 
    expect(cache.getStats()).toEqual([]);
});


// Требования
// 1. Хранение ключ - значение
// 1а. Значениею можно задать количество обращений
// 2. После обращение число обращений уменьшается на 1
// 3. (3а) Если значения по ключу нет или (3б) если число обращений равно 0, то кэш возвращает null
// 4. Если пара ключ-значение задана без указания числа обращений, то число обращений равно 1.
// 5. Нужна возможность получить статистику работы кэша в виде списка обращений: Ключ, Значение, Сколько осталось обращений.
// 6. Для каждого ключа известно число обращений, после которого кэш должен очиститься.