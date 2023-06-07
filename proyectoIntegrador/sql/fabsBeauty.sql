CREATE SCHEMA fabsBeauty;
USE fabsBeauty;

-- Table users
CREATE TABLE users(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(200) NOT NULL UNIQUE,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
profilePicture VARCHAR(500) NULL,
bDate DATE NOT NULL,
dni INT UNSIGNED NOT NULL,
phone VARCHAR(200) DEFAULT NULL,

createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
comment VARCHAR(500) NOT NULL,

idProduct INT UNSIGNED,
userId INT UNSIGNED,

FOREIGN KEY (idProduct) REFERENCES products(id),
FOREIGN KEY (userId) REFERENCES users(id),

createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp(),
updatedAt TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

INSERT INTO comments VALUES
(DEFAULT,'El producto es muy bueno y duradero', 1, 1,  DEFAULT, DEFAULT),
(DEFAULT, 'Espectacular, me encantó!!', 1, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Excelente. Se adhieren super bien', 1, 3,  DEFAULT, DEFAULT),
(DEFAULT, 'Re lindo el tono, ya lo tenía y es igual. Super recomendado', 1, 4, DEFAULT, DEFAULT),
(DEFAULT, 'No me convenció.', 2, 5, DEFAULT, DEFAULT),
(DEFAULT, 'Excelente. Pigmenta super bien', 2, 1, DEFAULT, DEFAULT),
(DEFAULT, 'Me encanta el efecto que deja en mi piel', 2, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Lo AMÉ', 2, 3, DEFAULT, DEFAULT),
(DEFAULT, 'La cremosidad es impresionante. 10 puntos', 3, 4, DEFAULT, DEFAULT),
(DEFAULT, 'Me encanta que vendan el producto en muchas tonalidades, inclusividad real!', 3, 5, DEFAULT, DEFAULT),
(DEFAULT, 'Tenía espectativas más altas de este producto', 3, 1, DEFAULT, DEFAULT),
(DEFAULT, 'Liviana y fresca. Me gustó mucho el producto', 3, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Hermosas tonalidades', 4, 3, DEFAULT, DEFAULT),
(DEFAULT, 'Recomiendo! Duran mucho tiempo', 4, 4, DEFAULT, DEFAULT),
(DEFAULT, 'No me gustó', 4, 5, DEFAULT, DEFAULT),
(DEFAULT,  'Ideales para usar en un evento diurno!', 4, 1, DEFAULT, DEFAULT),
(DEFAULT, 'I-N-C-R-E-Í-B-L-E el brillo y la cremsosidad de este labial', 5, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Hermoso color!', 5, 3, DEFAULT, DEFAULT),
(DEFAULT, 'Super resalta la boca!! Me encantó', 5, 4, DEFAULT, DEFAULT),
(DEFAULT, '10000/10', 5, 5, DEFAULT, DEFAULT),
(DEFAULT, 'El color es increíble', 6, 1, DEFAULT, DEFAULT),
(DEFAULT, 'Dura toda la noche y resalta tu cara al 100%', 6, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Lo comré una vez y no puedo dejar de usarlo! Muy bueno!', 6, 3, DEFAULT, DEFAULT),
(DEFAULT, 'Me pareció demasiado brillante', 6, 4, DEFAULT, DEFAULT),
(DEFAULT, 'Super liviana! Deja la piel impecable', 7, 5, DEFAULT, DEFAULT),
(DEFAULT, 'Me gusta como deja la textura de mi piel', 7, 1, DEFAULT, DEFAULT),
(DEFAULT, 'Lo mejor es su larga duración!', 7, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Recomiendo! Buena relación precio-calidad', 7, 3, DEFAULT, DEFAULT),
(DEFAULT, 'Es un \'must\' en mi necesser. La uso para toda ocasión', 8, 4, DEFAULT, DEFAULT),
(DEFAULT, 'El mix de tonalidades es todo lo que necesitás en tu día a día', 8, 5, DEFAULT, DEFAULT),
(DEFAULT, 'Increíbles! El pigmento es muy duradero', 8, 1, DEFAULT, DEFAULT),
(DEFAULT, 'Amo este producto', 8, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Ideal para todas las salidas nocturnas', 9, 3, DEFAULT, DEFAULT),
(DEFAULT, 'No se sale por nada del mundo. Excelente', 9, 4, DEFAULT, DEFAULT),
(DEFAULT, 'El color es super intenso, me encanta', 9, 5, DEFAULT, DEFAULT),
(DEFAULT, 'No hay forma que NO resaltes usando este labial', 9, 1, DEFAULT, DEFAULT),
(DEFAULT, 'La tonalidad no era lo que esperaba', 10, 2, DEFAULT, DEFAULT),
(DEFAULT, 'Me gusta su larga duración', 10, 3, DEFAULT, DEFAULT),
(DEFAULT, 'Si bien es matte, no seca mis labios. Aplausos!', 10, 4, DEFAULT, DEFAULT),
(DEFAULT, 'Me encantó!', 10, 5, DEFAULT, DEFAULT);