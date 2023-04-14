-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2023 a las 14:52:51
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectointegradorprograii`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_product` int(10) UNSIGNED DEFAULT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `comment` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `id_product`, `id_user`, `comment`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 'El producto es muy bueno y duradero', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(2, 1, 1, 'Espectacular, me encantó!!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(3, 1, 1, 'Excelente. Se adhieren super bien', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(4, 1, 1, 'Re lindo el tono, ya lo tenía y es igual. Super recomendado', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(5, 2, 2, 'No me convenció.', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(6, 2, 2, 'Excelente. Pigmenta super bien', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(7, 2, 2, 'Me encanta el efecto que deja en mi piel', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(8, 2, 2, 'Lo AMÉ', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(9, 3, 3, 'La cremosidad es impresionante. 10 puntos', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(10, 3, 3, 'Me encanta que vendan el producto en muchas tonalidades, inclusividad real!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(11, 3, 3, 'Tenía espectativas más altas de este producto', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(12, 3, 3, 'Liviana y fresca. Me gustó mucho el producto', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(13, 4, 4, 'Hermosas tonalidades', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(14, 4, 4, 'Recomiendo! Duran mucho tiempo', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(15, 4, 4, 'No me gustó', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(16, 4, 4, 'Ideales para usar en un evento diurno!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(17, 5, 5, 'I-N-C-R-E-Í-B-L-E el brillo y la cremsosidad de este labial', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(18, 5, 5, 'Hermoso color!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(19, 5, 5, 'Super resalta la boca!! Me encantó', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(20, 5, 5, '10000/10', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(21, 6, 1, 'El color es increíble', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(22, 6, 1, 'Dura toda la noche y resalta tu cara al 100%', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(23, 6, 1, 'Lo comré una vez y no puedo dejar de usarlo! Muy bueno!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(24, 6, 1, 'Me pareció demasiado brillante', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(25, 7, 2, 'Super liviana! Deja la piel impecable', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(26, 7, 2, 'Me gusta como deja la textura de mi piel', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(27, 7, 2, 'Lo mejor es su larga duración!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(28, 7, 2, 'Recomiendo! Buena relación precio-calidad', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(29, 8, 3, 'Es un \'must\' en mi necesser. La uso para toda ocasión', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(30, 8, 3, 'El mix de tonalidades es todo lo que necesitás en tu día a día', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(31, 8, 3, 'Increíbles! El pigmento es muy duradero', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(32, 8, 3, 'Amo este producto', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(33, 9, 4, 'Ideal para todas las salidas nocturnas', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(34, 9, 4, 'No se sale por nada del mundo. Excelente', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(35, 9, 4, 'El color es super intenso, me encanta', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(36, 9, 4, 'No hay forma que NO resaltes usando este labial', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(37, 10, 5, 'La tonalidad no era lo que esperaba', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(38, 10, 5, 'Me gusta su larga duración', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(39, 10, 5, 'Si bien es matte, no seca mis labios. Aplausos!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL),
(40, 10, 5, 'Me encantó!', '2023-04-11 18:49:57', '2023-04-11 18:49:57', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(300) NOT NULL,
  `longDescription` text NOT NULL,
  `shortDescription` varchar(200) NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `image` varchar(225) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `longDescription`, `shortDescription`, `user_id`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'GLOSS BOMB', 'El brillo de labios híbrido brinda un toque de tinte y de apariencia más completa. El innovador voluminizador contiene una mezcla de ingredientes, que incluyen aceite de raíz de jengibre y extracto de fruta de pimienta, diseñado para brindar una boca innegablemente espesa. La rica manteca de karité acondiciona mientras que el brillo húmedo maximiza el volumen visible. Es hora del efecto completo', 'Labial voluminizador color nude rosado', 1, '../images/makeup/2.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(2, 'BRONZER', 'Un polvo bronceador de larga duración y resistente a la transpiración. Brillo instantáneo, combinable y fácil de usar', 'Polvo bronzeador color marrón medium', 1, '../images/makeup/4.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(3, 'BASE PRO FILT\'R', 'Una base mate suave de larga duración que cuenta con tecnología adaptable al clima para combatir el calor, el sudor y el brillo. Salí todo el día o toda la noche, tu base siempre estará fresca', 'Base matte de larga duración color profundo', 1, '../images/makeup/5.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(4, 'SNAP SHADOWS', 'Una revolucionaria minipaleta de sombras de ojos portátil de 6 tonos ricos en una gama de acabados mate a brillante. Los colores son intensos y fáciles de mezclar. Combiná tus favoritos', 'Paleta portable de sombras color nudes durazno cálido', 1, '../images/makeup/8.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(5, 'GLOSS BOMB', 'El brillo de labios híbrido brinda un toque de tinte y de apariencia más completa. El innovador voluminizador contiene una mezcla de ingredientes, que incluyen aceite de raíz de jengibre y extracto de fruta de pimienta, diseñado para brindar una boca innegablemente espesa. La rica manteca de karité acondiciona mientras que el brillo húmedo maximiza el volumen visible. Es hora del efecto completo', 'Labial voluminizador color marrón', 1, '../images/makeup/1.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(6, 'HIGHLIGHTER', 'Un iluminador híbrido en crema-polvo de larga duración y ligero con un acabado hipermetálico, en una colorida gama de tonos que desafían las reglas diseñados para resaltar todos los tonos de piel. Infinitas formas de brillar', 'Iluminador crema-polvo color rubí', 1, '../images/makeup/3.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(7, 'BASE PRO FILT\'R', 'Una base mate suave de larga duración que cuenta con tecnología adaptable al clima para combatir el calor, el sudor y el brillo. Salí todo el día o toda la noche, tu base siempre estará fresca', 'Base matte de larga duración color claro medium', 1, '../images/makeup/6.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(8, 'SNAP SHADOWS', 'Una revolucionaria minipaleta de sombras de ojos portátil de 6 tonos ricos en una gama de acabados mate a brillante. Los colores son intensos y fáciles de mezclar. Combiná tus favoritos', 'Paleta portable de sombras color nudes clásicos', 1, '../images/makeup/7.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(9, 'LIPSTICK ICON', 'El lipstick semi-matte fue creado con una fórmula para hacer que tus labios se vean cremosos, suaves y voluminosos. Su efecto duradero y color cautivante hace de éste el labial perfecto', 'Labial semi-matte color rojo', 1, '../images/makeup/9.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL),
(10, 'LIPSTICK ICON', 'El lipstick semi-matte fue creado con una fórmula para hacer que tus labios se vean cremosos, suaves y voluminosos. Su efecto duradero y color cautivante hace de éste el labial perfecto', 'Labial semi-matte color rosa claro', 1, '../images/makeup/11.png', '2023-04-11 17:49:39', '2023-04-11 17:55:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profilePicture` varchar(225) NOT NULL,
  `date` date NOT NULL,
  `dni` int(10) UNSIGNED DEFAULT NULL,
  `celular` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `uptadetAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `profilePicture`, `date`, `dni`, `celular`, `createdAt`, `uptadetAt`, `deletedAt`) VALUES
(1, 'brivero@gmail.com', 'udesa123', '../images/users/user4.jpg', '2003-10-14', 45342891, '3493404974', '2023-04-10 15:33:29', '2023-04-10 15:33:29', NULL),
(2, 'acardozo@gmail.com', 'lunaresAmarillos88', '../images/users/user0.jpg', '2003-11-11', 43537466, '3493562172', '2023-04-10 15:33:29', '2023-04-10 15:33:29', NULL),
(3, 'eloboo@gmail.com', 'Mariposadefideos.58', '../images/users/user2.jpg', '2003-09-23', 45268446, '3493663946', '2023-04-10 15:33:29', '2023-04-10 15:33:29', NULL),
(4, 'mpinto@gmail.com', 'claritaylolo_77', '../images/users/user1.jpg', '2003-04-02', 44996353, '3493590666', '2023-04-10 15:33:29', '2023-04-10 15:33:29', NULL),
(5, 'ovelazquez@gmail.com', '18dDiciembre.2022', '../images/users/user3.jpg', '2003-08-06', 45268434, '3493442924', '2023-04-10 15:33:29', '2023-04-10 15:33:29', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
