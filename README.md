#Wild Shape
5th Edition Dungeons and Dragons - wild shape viewer for Druids.

###About
Got tired of my wife stealing the Monster Manual every time her druid changed shape. And there were just too many cards to keep track of when I tried making those.

So I went and made a simple "mobile app" for keeping track of all her beast forms.

The app will filter based on level and if you are a Circle of the Moon druid (moon icon, upper right). So you won't see flying or swimming beasts till reach the appropriate level. upper right). So you won't see flying or swimming beasts till reach the apporpriate leve.

###Instructions
Simply throw the files up on some hosting or run it locally (Node, Mamp...whatever). No database setup needed. It might work just opening the index.html in a browser (Chrome has issues with this but FireFox seems fine with it) you mileage may vary.

Beast data is located at /beast_data/beasts.xml and contains some examples. (Maybe check /r/dnd or /r/dndnext on reddit to see if any kind souls might share their data.)

###Development
If you feel the need to change some css check the package.json.

```
npm install
```

```
gulp
```

And you should be good to go.

###Credits
Icons come from [http://game-icons.net/](Game-Icons.net)
