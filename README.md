# Инструкция к проекту Dukascopy CLI

Этот инструмент командной строки (CLI) позволяет загружать и манипулировать данными Dukascopy.

## Конфигурация (CLI)

| Option          | Alias | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                                               
## Опции

- `--instrument`, `-i`: Идентификатор торгового инструмента. [Просмотреть список](https://www.dukascopy.com/swiss/about/dukascopy_contacts.jfx)
- `--date-from`, `-from`: Начальная дата (гггг-мм-дд)
- `--date-to`, `-to`: Конечная дата (гггг-мм-дд или 'now')
- `--timeframe`, `-t`: Временной интервал агрегации (tick, s1, m1, m5, m15, m30, h1, h4, d1, mn1)
- `--price-type`, `-p`: Тип цены: (bid, ask)
- `--utc-offset`, `-utc`: Смещение UTC в минутах
- `--volumes`, `-v`: Включить объемы
- `--volume-units`, `-vu`: Единицы объема (millions, thousands, units) (по умолчанию: "millions")
- `--flats`, `-fl`: Включить флэты (0 объемов)
- `--format`, `-f`: Формат вывода (csv, json, array). [Примеры вывода](https://www.dukascopy-node.app/config/cli)
- `--directory`, `-dir`: Каталог для загрузки
- `--batch-size`, `-bs`: Размер пакета загружаемых артефактов
- `--batch-pause`, `-bp`: Пауза между пакетами в мс
- `--cache`, `-ch`: Использовать кэш
- `--cache-path`, `-chpath`: Путь к папке для кэшированных данных
- `--retries`, `-r`: Количество повторных попыток для неудачной загрузки артефакта
- `--retry-on-empty`, `-re`: Флаг, указывающий, следует ли повторять запросы с успешными, но пустыми (0 байт) ответами. Если retries равен 0, этот параметр игнорируется.
- `--no-fail-after-retries`, `-fr`: Флаг, указывающий, следует ли завершать процесс с ошибкой после исчерпания всех повторных попыток. Если retries равен 0, этот параметр игнорируется.
- `--retry-pause`, `-rp`: Пауза между повторными попытками в миллисекундах
- `--debug`, `-d`: Вывод дополнительной отладочной информации
- `--silent`, `-s`: Скрывает конфигурацию поиска в выводе CLI
- `--inline`, `-in`: Уменьшает размер файлов, удаляя новые строки в выводе (работает только с форматами json и array)
- `--file-name`, `-fn`: Пользовательское имя файла для сгенерированного файла
- `--date-format`, `-df`: Формат даты (пример: "YYYY-MM-DD HH:mm:ss" или "iso"). [Подробнее](https://momentjs.com/docs/#/displaying/format/)
- `--time-zone`, `-tz`: Преобразует даты в указанный часовой пояс. [Подробнее](https://momentjs.com/timezone/)
- `--help`, `-h`: Отображает справку по команде

## Примеры использования

```bash
# Загрузка данных для EURUSD за определенный период
curl -X POST -H "Content-Type: application/json" -d '{
  "instrument": "EURUSD",
  "from": "2023-01-01",
  "to": "2023-01-05"
}' http://localhost:3000/historical

# Загрузка тиковых данных для GBPUSD
curl -X POST -H "Content-Type: application/json" -d '{
  "instrument": "GBPUSD",
  "from": "2023-01-01",
  "to": "2023-01-02",
  "timeframe": "tick"
}' http://localhost:3000/historical

# Загрузка данных с указанием формата и других параметров
curl -X POST -H "Content-Type: application/json" -d '{
  "instrument": "USDJPY",
  "from": "2023-01-01",
  "to": "2023-01-02",
  "format": "json",
  "utcOffset": 60,
  "volumes": true,
  "volumeUnits": "thousands"
}' http://0.0.0.0:3000/historical
```

## Дополнительная информация

Более подробную информацию можно найти на [сайте проекта](https://www.dukascopy-node.app/).
