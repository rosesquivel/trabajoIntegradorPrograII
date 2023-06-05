CREATE SCHEMA fabsBeauty;
USE fabsBeauty;

-- Table users
CREATE TABLE users(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
userName VARCHAR(200) NOT NULL UNIQUE,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
profilePicture VARCHAR(500) NULL,
bDate DATE NOT NULL,
dni INT UNSIGNED NOT NULL,
phone VARCHAR(200) DEFAULT NULL,

createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
uptadetAt TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

INSERT INTO users VALUES
(DEFAULT, 'bian_rivero','brivero@gmail.com', 'udesa123', '/images/users/user4.jpg', '2003-10-14', 45342891, '3493404974', DEFAULT, DEFAULT),
(DEFAULT, 'alberta_cardozo','acardozo@gmail.com', 'lunaresAmarillos88', '/images/users/user0.jpg', '2003-11-11', 43537466, '3493562172', DEFAULT, DEFAULT),
(DEFAULT, 'eva_lobo21','eloboo@gmail.com', 'Mariposadefideos.58', '/images/users/user2.jpg', '2003-09-23', 45268446, '3493663946', DEFAULT, DEFAULT),
(DEFAULT, 'marcelita_pinto','mpinto@gmail.com', 'claritaylolo_77', '/images/users/user1.jpg', '2003-04-02', 44996353, '3493590666', DEFAULT, DEFAULT),
(DEFAULT, 'ori_vlz','ovelazquez@gmail.com', '18dDiciembre.2022', '/images/users/user3.jpg', '2003-08-06', 45268434, '3493442924', DEFAULT, DEFAULT);

-- Table products
CREATE TABLE products(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(300) NOT NULL,
longDescription VARCHAR(500) NOT NULL,
shortDescription VARCHAR(200) NOT NULL,
image VARCHAR(500) NULL,
userId INT UNSIGNED,

FOREIGN KEY (userId) REFERENCES users(id),

createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

INSERT INTO products VALUES
(DEFAULT, 'GLOSS BOMB', 'El brillo de labios híbrido brinda un toque de tinte y de apariencia más completa. El innovador voluminizador contiene una mezcla de ingredientes, que incluyen aceite de raíz de jengibre y extracto de fruta de pimienta, diseñado para brindar una boca innegablemente espesa. La rica manteca de karité acondiciona mientras que el brillo húmedo maximiza el volumen visible. Es hora del efecto completo', 'Labial voluminizador color nude rosado', '/images/makeup/2.png', 1, DEFAULT, DEFAULT),
(DEFAULT, 'BRONZER', 'Un polvo bronceador de larga duración y resistente a la transpiración. Brillo instantáneo, combinable y fácil de usar', 'Polvo bronzeador color marrón medium', '/images/makeup/4.png', 1, DEFAULT, DEFAULT),
(DEFAULT, 'BASE PRO FILTER', 'Una base mate suave de larga duración que cuenta con tecnología adaptable al clima para combatir el calor, el sudor y el brillo. Salí todo el día o toda la noche, tu base siempre estará fresca', 'Base matte de larga duración color profundo', '/images/makeup/5.png', 2, DEFAULT, DEFAULT),
(DEFAULT, 'SNAP SHADOWS', 'Una revolucionaria minipaleta de sombras de ojos portátil de 6 tonos ricos en una gama de acabados mate a brillante. Los colores son intensos y fáciles de mezclar. Combiná tus favoritos', 'Paleta portable de sombras color nudes durazno cálido', '/images/makeup/8.png', 2, DEFAULT, DEFAULT),
(DEFAULT, 'GLOSS BOMB', 'El brillo de labios híbrido brinda un toque de tinte y de apariencia más completa. El innovador voluminizador contiene una mezcla de ingredientes, que incluyen aceite de raíz de jengibre y extracto de fruta de pimienta, diseñado para brindar una boca innegablemente espesa. La rica manteca de karité acondiciona mientras que el brillo húmedo maximiza el volumen visible. Es hora del efecto completo', 'Labial voluminizador color marrón', '/images/makeup/1.png', 3, DEFAULT, DEFAULT),
(DEFAULT, 'HIGHLIGHTER', 'Un iluminador híbrido en crema-polvo de larga duración y ligero con un acabado hipermetálico, en una colorida gama de tonos que desafían las reglas diseñados para resaltar todos los tonos de piel. Infinitas formas de brillar', 'Iluminador crema-polvo color rubí', '/images/makeup/3.png', 3, DEFAULT, DEFAULT),
(DEFAULT, 'BASE PRO FILTER', 'Una base mate suave de larga duración que cuenta con tecnología adaptable al clima para combatir el calor, el sudor y el brillo. Salí todo el día o toda la noche, tu base siempre estará fresca', 'Base matte de larga duración color claro medium', '/images/makeup/6.png', 4, DEFAULT, DEFAULT),
(DEFAULT, 'SNAP SHADOWS', 'Una revolucionaria minipaleta de sombras de ojos portátil de 6 tonos ricos en una gama de acabados mate a brillante. Los colores son intensos y fáciles de mezclar. Combiná tus favoritos', 'Paleta portable de sombras color nudes clásicos', '/images/makeup/7.png', 4, DEFAULT, DEFAULT),
(DEFAULT, 'LIPSTICK ICON', 'El lipstick semi-matte fue creado con una fórmula para hacer que tus labios se vean cremosos, suaves y voluminosos. Su efecto duradero y color cautivante hace de éste el labial perfecto', 'Labial semi-matte color rojo', '/images/makeup/9.png', 5, DEFAULT, DEFAULT),
(DEFAULT, 'LIPSTICK ICON', 'El lipstick semi-matte fue creado con una fórmula para hacer que tus labios se vean cremosos, suaves y voluminosos. Su efecto duradero y color cautivante hace de éste el labial perfecto', 'Labial semi-matte color rosa claro', '/images/makeup/11.png', 5, DEFAULT, DEFAULT);

-- Table comments
CREATE TABLE comments(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
idProduct INT UNSIGNED,
userId INT UNSIGNED,
comment VARCHAR(500) NOT NULL,

FOREIGN KEY (idProduct) REFERENCES products(id),
FOREIGN KEY (userId) REFERENCES users(id),

createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

INSERT INTO comments VALUES
(DEFAULT, 1, 1, 'El producto es muy bueno y duradero', DEFAULT, DEFAULT),
(DEFAULT, 1, 2, 'Espectacular, me encantó!!', DEFAULT, DEFAULT),
(DEFAULT, 1, 3, 'Excelente. Se adhieren super bien', DEFAULT, DEFAULT),
(DEFAULT, 1, 4, 'Re lindo el tono, ya lo tenía y es igual. Super recomendado', DEFAULT, DEFAULT),
(DEFAULT, 2, 5, 'No me convenció.', DEFAULT, DEFAULT),
(DEFAULT, 2, 1, 'Excelente. Pigmenta super bien', DEFAULT, DEFAULT),
(DEFAULT, 2, 2, 'Me encanta el efecto que deja en mi piel', DEFAULT, DEFAULT),
(DEFAULT, 2, 3, 'Lo AMÉ', DEFAULT, DEFAULT),
(DEFAULT, 3, 4, 'La cremosidad es impresionante. 10 puntos', DEFAULT, DEFAULT),
(DEFAULT, 3, 5, 'Me encanta que vendan el producto en muchas tonalidades, inclusividad real!', DEFAULT, DEFAULT),
(DEFAULT, 3, 1, 'Tenía espectativas más altas de este producto', DEFAULT, DEFAULT),
(DEFAULT, 3, 2, 'Liviana y fresca. Me gustó mucho el producto', DEFAULT, DEFAULT),
(DEFAULT, 4, 3, 'Hermosas tonalidades', DEFAULT, DEFAULT),
(DEFAULT, 4, 4, 'Recomiendo! Duran mucho tiempo', DEFAULT, DEFAULT),
(DEFAULT, 4, 5, 'No me gustó', DEFAULT, DEFAULT),
(DEFAULT, 4, 1, 'Ideales para usar en un evento diurno!', DEFAULT, DEFAULT),
(DEFAULT, 5, 2, 'I-N-C-R-E-Í-B-L-E el brillo y la cremsosidad de este labial', DEFAULT, DEFAULT),
(DEFAULT, 5, 3, 'Hermoso color!', DEFAULT, DEFAULT),
(DEFAULT, 5, 4, 'Super resalta la boca!! Me encantó', DEFAULT, DEFAULT),
(DEFAULT, 5, 5, '10000/10', DEFAULT, DEFAULT),
(DEFAULT, 6, 1, 'El color es increíble', DEFAULT, DEFAULT),
(DEFAULT, 6, 2, 'Dura toda la noche y resalta tu cara al 100%', DEFAULT, DEFAULT),
(DEFAULT, 6, 3, 'Lo comré una vez y no puedo dejar de usarlo! Muy bueno!', DEFAULT, DEFAULT),
(DEFAULT, 6, 4, 'Me pareció demasiado brillante', DEFAULT, DEFAULT),
(DEFAULT, 7, 5, 'Super liviana! Deja la piel impecable', DEFAULT, DEFAULT),
(DEFAULT, 7, 1, 'Me gusta como deja la textura de mi piel', DEFAULT, DEFAULT),
(DEFAULT, 7, 2, 'Lo mejor es su larga duración!', DEFAULT, DEFAULT),
(DEFAULT, 7, 3, 'Recomiendo! Buena relación precio-calidad', DEFAULT, DEFAULT),
(DEFAULT, 8, 4, 'Es un \'must\' en mi necesser. La uso para toda ocasión', DEFAULT, DEFAULT),
(DEFAULT, 8, 5, 'El mix de tonalidades es todo lo que necesitás en tu día a día', DEFAULT, DEFAULT),
(DEFAULT, 8, 1, 'Increíbles! El pigmento es muy duradero', DEFAULT, DEFAULT),
(DEFAULT, 8, 2, 'Amo este producto', DEFAULT, DEFAULT),
(DEFAULT, 9, 3, 'Ideal para todas las salidas nocturnas', DEFAULT, DEFAULT),
(DEFAULT, 9, 4, 'No se sale por nada del mundo. Excelente', DEFAULT, DEFAULT),
(DEFAULT, 9, 5, 'El color es super intenso, me encanta', DEFAULT, DEFAULT),
(DEFAULT, 9, 1, 'No hay forma que NO resaltes usando este labial', DEFAULT, DEFAULT),
(DEFAULT, 10, 2, 'La tonalidad no era lo que esperaba', DEFAULT, DEFAULT),
(DEFAULT, 10, 3, 'Me gusta su larga duración', DEFAULT, DEFAULT),
(DEFAULT, 10, 4, 'Si bien es matte, no seca mis labios. Aplausos!', DEFAULT, DEFAULT),
(DEFAULT, 10, 5, 'Me encantó!', DEFAULT, DEFAULT);