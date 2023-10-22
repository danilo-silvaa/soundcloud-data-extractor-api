## O que é `client_id`?

O client_id é um identificador exclusivo associado a uma aplicação registrada na plataforma do SoundCloud. Ele é utilizado para identificar a origem das requisições feitas à API, garantindo que apenas aplicações autorizadas tenham permissão para fazer solicitações e interagir com os recursos do SoundCloud.

---

Sabendo que o client_id é um identificador da sua aplicação registrada na plataforma do SoundCloud, você chega à conclusão de que é necessário registrar sua aplicação para obter esse client_id e poder utilizar às APIs deles. No entanto, ao acessar a [página de registro de aplicativos](https://docs.google.com/forms/d/e/1FAIpQLSfNxc82RJuzC0DnISat7n4H-G7IsPQIdaMpe202iiHZEoso9w/closedform), deparamos com uma mensagem informando: "Devido à grande quantidade de solicitações recebidas recentemente, não processaremos mais solicitações de aplicativos de API neste momento." Isso significa que, temporariamente, não é possível registrar novas aplicações.

Diante dessa situação, resta-nos explorar alternativas para obter o client_id. Foi nesse contexto que iniciei a investigação sobre como o SoundCloud utiliza suas próprias APIs. Verifiquei que eles também incorporam o client_id nas requisições. Portanto, podemos visualizar o client_id que eles utilizam e empregá-lo em nossa aplicação. Curiosamente, parece não haver verificações de origem da requisição ou medidas restritivas semelhantes, o que nos permite utilizar esse client_id de maneira tranquila.

## Alternativa para obtenção do `client_id`.

Como mencionado anteriormente, o SoundCloud utiliza um client_id em suas requisições, e por algum motivo também podemos usar em nossas aplicações. Considerando essa possibilidade, é viável adquirir manualmente esse client_id por meio da Ferramenta para Desenvolvedores no navegador, conforme ilustrado na imagem abaixo:

![Imagem do client_id no SoundCloud](https://i.imgur.com/ZbfUZNB.png)

No entanto, com base na experiência adquirida durante a [API para extrair dados do YouTube](https://github.com/danilo-modz/youtube-data-extractor-api), é importante notar que há uma chance de que o SoundCloud possa alterar o client_id. Essa mudança pode resultar na invalidação do client_id obtido manualmente, demandando a repetição do processo para obter um novo client_id. Diante dessa perspectiva, surgiu a ideia de desenvolver um algoritmo para automatizar esse processo. Esta abordagem visa criar uma solução eficaz e contínua, capaz de adaptar-se às eventuais alterações no client_id.

## Processo de extração do `client_id`.

Diante da minha análise, descobri que o SoundCloud expõe o client_id em alguns dos scripts carregados na página. Na página inicial, diversos scripts estão presentes, conforme ilustrado na imagem abaixo:

![Imagem de Scripts no SoundCloud](https://i.imgur.com/z7XC8DO.png)

Após outra análise, concluí que os dois últimos scripts contêm o client_id. Portanto, ao realizar scraping, é recomendável buscar o último script da página e, em seguida, extrair a URL desse script para realizar um scraping específico em busca do client_id.

Alguns pontos a serem considerados:

**1. Coleta da URL do Último Script:**
   - Inicie o processo realizando scraping na página inicial do SoundCloud.
   - Extraia a URL do último script presente na página.

**2. Scraping do Script para Obtenção do `client_id`:**
   - Utilize a URL obtida anteriormente para realizar scraping específico no script.
   - Procure pelo padrão `{client_id:"` no código do script.

**3. Resultado Final:**
   - Agora, você possui o `client_id` em mãos e pode integrá-lo nas suas requisições à API do SoundCloud.

Espero que, com o conhecimento que compartilhei, você consiga aplicá-lo na prática e desenvolver seu próprio algoritmo na sua linguagem de preferência.

---

## Sobre o repositório.

Se preferir, você pode clonar este repositório e executar os seguintes comandos dentro da pasta do projeto:

1. `npm install`
2. `npm run start:dev`

Não se esqueça de configurar no arquivo `.env` a porta na qual o servidor será executado e definir uma secretKey para utilizar nos endpoints da sua API.

## Por padrão eu criei apenas o endpoint abaixo:

### Buscar tracks

* **URL**

  `http://localhost:3333/v1/search`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | secret_key      | string         | Chave de autenticação da aplicação         | sim             |
    | keywords        | string         | Palavras-chave para a busca da música      | sim             |
    | limit           | int            | Total de músicas a serem retornadas        | não             |
    | offset          | int            | Posição inicial da lista de resultados     | não             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "collection": [
            {
            "artwork_url": "https://i1.sndcdn.com/artworks-zkJ6xp0eRvgGZYal-9hFizA-large.jpg",
            "caption": null,
            "commentable": true,
            "comment_count": 547,
            "created_at": "2023-05-04T23:48:02Z",
            "description": "",
            "downloadable": false,
            "download_count": 0,
            "duration": 420989,
            "full_duration": 420989,
            "embeddable_by": "all",
            "genre": "Funk",
            "has_downloads_left": false,
            "id": 1506701833,
            "kind": "track",
            "label_name": null,
            "last_modified": "2023-08-25T04:35:05Z",
            "license": "all-rights-reserved",
            "likes_count": 184664,
            "permalink": "set-dj-boy-30-oficial-mc-hariel-mc-kako-mc-don-juan-mc-tuto-mc-marks-joaozinho-vt-mc-vine-8",
            "permalink_url": "https://soundcloud.com/xxbg/set-dj-boy-30-oficial-mc-hariel-mc-kako-mc-don-juan-mc-tuto-mc-marks-joaozinho-vt-mc-vine-8",
            "playback_count": 9438357,
            "public": true,
            "publisher_metadata": {
                "id": 1506701833,
                "urn": "soundcloud:tracks:1506701833",
                "artist": "Rick Sargnalan Lorina",
                "contains_music": true,
                "isrc": "QZMHN2325837",
                "explicit": false,
                "writer_composer": "Rick Sargnalan Lorina"
            },
            "purchase_title": null,
            "purchase_url": null,
            "release_date": null,
            "reposts_count": 1314,
            "secret_token": null,
            "sharing": "public",
            "state": "finished",
            "streamable": true,
            "tag_list": "",
            "title": "Set DJ Boy 3.0 Oficial - MC Hariel, MC Kako, MC Don Juan, MC Tuto, MC Marks, Joãozinho VT, MC Vine 7",
            "track_format": "single-track",
            "uri": "https://api.soundcloud.com/tracks/1506701833",
            "urn": "soundcloud:tracks:1506701833",
            "user_id": 1164173221,
            "visuals": null,
            "waveform_url": "https://wave.sndcdn.com/Ne99Pj8ecIOJ_m.json",
            "display_date": "2023-05-04T23:48:02Z",
            "media": {
                "transcodings": [
                {
                    "url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:1506701833/ba047889-1605-405e-9505-5cf342b977bc/stream/hls?client_id=XlMFimLMnOsgUUQTvzl7p9mD52JnBQBm",
                    "preset": "mp3_1_0",
                    "duration": 420989,
                    "snipped": false,
                    "format": {
                    "protocol": "hls",
                    "mime_type": "audio/mpeg"
                    },
                    "quality": "sq"
                },
                {
                    "url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:1506701833/ba047889-1605-405e-9505-5cf342b977bc/stream/progressive?client_id=XlMFimLMnOsgUUQTvzl7p9mD52JnBQBm",
                    "preset": "mp3_1_0",
                    "duration": 420989,
                    "snipped": false,
                    "format": {
                    "protocol": "progressive",
                    "mime_type": "audio/mpeg"
                    },
                    "quality": "sq"
                },
                {
                    "url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:1506701833/9bae8c99-a60c-4182-bdc6-338bee8a3f70/stream/hls?client_id=XlMFimLMnOsgUUQTvzl7p9mD52JnBQBm",
                    "preset": "opus_0_0",
                    "duration": 420970,
                    "snipped": false,
                    "format": {
                    "protocol": "hls",
                    "mime_type": "audio/ogg; codecs=\"opus\""
                    },
                    "quality": "sq"
                }
                ]
            },
            "station_urn": "soundcloud:system-playlists:track-stations:1506701833",
            "station_permalink": "track-stations:1506701833",
            "track_authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJCUiIsInN1YiI6IiIsInJpZCI6IjNhMGVlZGU1LWFhOWUtNDA2Ni05ODBjLWFkMTM4MWVmYzg0MCIsImlhdCI6MTY5ODAwNjY2MX0.cG_Xqwmf-up5iF8OmktptT0mUKa8bSWrAXcOvKaduY4",
            "monetization_model": "NOT_APPLICABLE",
            "policy": "ALLOW",
            "user": {
                "avatar_url": "https://i1.sndcdn.com/avatars-zeHy6hQCJTUBMJJR-9RW34g-large.jpg",
                "city": "City of Lies - Complexo",
                "comments_count": 0,
                "country_code": "BR",
                "created_at": "2022-09-13T18:54:30Z",
                "creator_subscriptions": [
                {
                    "product": {
                    "id": "free"
                    }
                }
                ],
                "creator_subscription": {
                "product": {
                    "id": "free"
                }
                },
                "description": "Divulgue sua canção aqui no canal e de brinde receba uma pequena produção. @Metefficha",
                "followers_count": 14309,
                "followings_count": 8,
                "first_name": "Xxbg",
                "full_name": "Xxbg ☯",
                "groups_count": 0,
                "id": 1164173221,
                "kind": "user",
                "last_modified": "2023-10-20T00:13:58Z",
                "last_name": "☯",
                "likes_count": 71,
                "playlist_likes_count": 0,
                "permalink": "xxbg",
                "permalink_url": "https://soundcloud.com/xxbg",
                "playlist_count": 3,
                "reposts_count": null,
                "track_count": 44,
                "uri": "https://api.soundcloud.com/users/1164173221",
                "urn": "soundcloud:users:1164173221",
                "username": "Xxbg Record ☯",
                "verified": false,
                "visuals": {
                "urn": "soundcloud:users:1164173221",
                "enabled": true,
                "visuals": [
                    {
                    "urn": "soundcloud:visuals:196066881",
                    "entry_time": 0,
                    "visual_url": "https://i1.sndcdn.com/visuals-001164173221-5qhWDw-original.jpg"
                    }
                ],
                "tracking": null
                },
                "badges": {
                "pro": false,
                "pro_unlimited": false,
                "verified": false
                },
                "station_urn": "soundcloud:system-playlists:artist-stations:1164173221",
                "station_permalink": "artist-stations:1164173221"
            }
            }
        ],
        "total_results": 3076,
        "next_href": "https://api-v2.soundcloud.com/search/tracks?query_urn=soundcloud%3Asearch%3A549e462aa94048e8af1cc121c1a3b002&limit=1&offset=1&q=djboy",
        "query_urn": "soundcloud:search:549e462aa94048e8af1cc121c1a3b002"
    }
    ```

-----