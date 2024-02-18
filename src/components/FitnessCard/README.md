### Импорт
import { FitnessCard } from 'components'

### Описание

Компонент отрисовывает карточку фитнеса. Принимает пропсами:
  *children - Это название карточки
  *image - изображение которое будет бэкграундом
  *hasButton - булевый, есть ли у карточки кнопка, как в макете страницы мой профиль, по умолчанию false
  *variant - принимает либо 'main' (стоит по умолчанию), либо 'myProfile' - отвечает за стиль карточки
  *onClick - функция-коллбек при клике на карточку
  *buttonOnClick - принимает функцию-коллбек, которая будет передана кнопке.

Пропсы могут измениться по мере разработки проекта