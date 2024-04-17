-- Table: public.user_info

-- DROP TABLE IF EXISTS public.user_info;

CREATE TABLE
IF NOT EXISTS public.user_info
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying
(20) COLLATE pg_catalog."default" NOT NULL,
    birthdate date NOT NULL,
    age numeric,
    gender character varying
(255) COLLATE pg_catalog."default",
    profile_picture_url character varying
(255) COLLATE pg_catalog."default",
    cash_balance numeric,
    create_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    update_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    user_type character varying
(20) COLLATE pg_catalog."default",
    profile_picture bytea,
    CONSTRAINT user_info_pkey PRIMARY KEY
(id)
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.user_info
    OWNER to postgres;

-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE
IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_brand_name character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    product_description character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    product_category character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    product_price numeric
(10,2) NOT NULL,
    product_rating numeric
(10,1),
    product_image_url character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    create_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    update_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    product_color character varying
(50) COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY
(id)
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.products
    OWNER to postgres;

-- Table: public.carts

-- DROP TABLE IF EXISTS public.carts;



CREATE TABLE
IF NOT EXISTS public.carts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    product_quantity numeric NOT NULL,
    product_size character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    create_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    update_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    CONSTRAINT carts_pkey PRIMARY KEY
(id),
    CONSTRAINT fk_productid FOREIGN KEY
(product_id)
        REFERENCES public.products
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION,
    CONSTRAINT fk_userid
FOREIGN KEY
(user_id)
        REFERENCES public.user_info
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.carts
    OWNER to postgres;


-- Table: public.user_order

-- DROP TABLE IF EXISTS public.user_order;

CREATE TABLE
IF NOT EXISTS public.user_order
(
id integer
NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    status character varying
(250) COLLATE pg_catalog."default",
    order_payment_type character varying
(250) COLLATE pg_catalog."default",
    shipping_address character varying
(255) COLLATE pg_catalog."default",
    billing_address character varying
(255) COLLATE pg_catalog."default",
    payment_status character varying
(50) COLLATE pg_catalog."default",
    delivery_status character varying
(50) COLLATE pg_catalog."default",
    order_notes text COLLATE pg_catalog."default",
    create_date timestamp without time zone DEFAULT 'now()',
    update_date timestamp without time zone DEFAULT 'now()',
    estimated_tax numeric
(10,2),
    order_price numeric
(10,2),
    total_order_price_with_tax numeric
(10,2),
    CONSTRAINT user_order_pkey PRIMARY KEY
(id),
    CONSTRAINT user_order_user_id_fkey FOREIGN KEY
(user_id)
        REFERENCES public.user_info
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.user_order
    OWNER to postgres;

-- Table: public.order_details

-- DROP TABLE IF EXISTS public.order_details;

CREATE TABLE
IF NOT EXISTS public.order_details
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    product_quantity integer NOT NULL,
    product_price numeric,
    product_size character varying
(50) COLLATE pg_catalog."default",
    CONSTRAINT order_details_pkey PRIMARY KEY
(id),
    CONSTRAINT order_details_order_id_fkey FOREIGN KEY
(order_id)
        REFERENCES public.user_order
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION,
    CONSTRAINT order_details_product_id_fkey
FOREIGN KEY
(product_id)
        REFERENCES public.products
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.order_details
    OWNER to postgres;




-- Table: public.products_quantity

-- DROP TABLE IF EXISTS public.products_quantity;

CREATE TABLE
IF NOT EXISTS public.products_quantity
(

id integer
NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    product_size character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    product_size_quantity integer NOT NULL,
    create_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    update_date timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    CONSTRAINT products_quantity_pkey PRIMARY KEY
(id),
    CONSTRAINT fk_productid FOREIGN KEY
(product_id)
        REFERENCES public.products
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.products_quantity
    OWNER to postgres;

-- Table: public.user_addresses

-- DROP TABLE IF EXISTS public.user_addresses;

CREATE TABLE
IF NOT EXISTS public.user_addresses
(
id integer
NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),    user_id integer,
    fullname character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    mobilenumber character varying
(20) COLLATE pg_catalog."default" NOT NULL,
    address character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    localitytown character varying
(255) COLLATE pg_catalog."default" NOT NULL,
    city character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    state character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    zip character varying
(20) COLLATE pg_catalog."default" NOT NULL,
    country character varying
(100) COLLATE pg_catalog."default" NOT NULL,
    is_default boolean DEFAULT 'false',
    addresstype character varying
(20) COLLATE pg_catalog."default",
    CONSTRAINT user_addresses_pkey PRIMARY KEY
(id),
    CONSTRAINT user_addresses_user_id_fkey FOREIGN KEY
(user_id)
        REFERENCES public.user_info
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.user_addresses
    OWNER to postgres;


-- Table: public.wishlist

-- DROP TABLE IF EXISTS public.wishlist;

CREATE TABLE
IF NOT EXISTS public.wishlist
(
id integer
NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    date_added timestamp without time zone DEFAULT
(now
() AT TIME ZONE 'utc'::text),
    CONSTRAINT wishlist_pkey PRIMARY KEY
(id),
    CONSTRAINT fk_productid FOREIGN KEY
(product_id)
        REFERENCES public.products
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION,
    CONSTRAINT fk_userid
FOREIGN KEY
(user_id)
        REFERENCES public.user_info
(id) MATCH SIMPLE
        ON
UPDATE NO ACTION
        ON
DELETE NO ACTION
)

TABLESPACE
pg_default;

ALTER TABLE
IF EXISTS public.wishlist
    OWNER to postgres;




INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Levi Strauss & Co.', 'Levi Strauss & Co. Casual Denim Jacket and Shorts Set - Stay relaxed and stylish with this casual ensemble from Levi Strauss & Co. Featuring a denim jacket paired with comfortable shorts, it is perfect for a day out or casual gatherings.', 'womenCategory', 24.99, 4.7, '/productImages/womenCategory/womendress4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Denim (Blue)');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Forever 21', 'Forever 21 Chic White Shimmery Dress - Stand out in style with this chic white shimmery dress from Forever 21. Featuring intricate detailing, it is ideal for evening parties or special events.', 'womenCategory', 29.99, 4.7, '/productImages/womenCategory/womendress5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Kalini', 'Kalini Red Kurta with Trousers - Elevate your ethnic wardrobe with this stunning red kurta ensemble from Kalini. Perfect for festive occasions and special events.', 'womenCategory', 49.99, 4.8, '/productImages/womenCategory/womendress6.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Red');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Ralph Lauren', 'Ralph Lauren Elegant Green Dress - Make a stylish entrance with this elegant green dress from Ralph Lauren. With a flattering silhouette, it is suitable for formal occasions or cocktail parties.', 'womenCategory', 39.99, 4.6, '/productImages/womenCategory/womendress7.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Green');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Forever 21', 'Forever 21 Vibrant Red T-shirt and Black Skirt Set - Make a bold statement with this vibrant red t-shirt paired with a black skirt from Forever 21. Effortlessly chic, it is perfect for casual outings or social gatherings.', 'womenCategory', 79.99, 4.6, '/productImages/womenCategory/womendress8.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Red and Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('H&M', 'H&M Printed Midi Skirt - Stay on trend with this printed midi skirt from H&M. Featuring a flowy silhouette, it is a versatile piece that can be dressed up or down for various occasions.', 'womenCategory', 149.99, 4.4, '/productImages/womenCategory/womendress9.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Printed');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Forever 21', 'Forever 21 Timeless White Dress - Embrace timeless elegance with this white dress from Forever 21. Featuring a classic design, it is perfect for summer days or casual brunches with friends.', 'womenCategory', 69.99, 4.3, '/productImages/womenCategory/womendress10.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Tanishq', 'Tanishq Traditional Bridal Jewelry Set - Make a statement on your special day with this traditional bridal jewelry set featuring intricate designs and precious gemstones from Tanishq. Perfect for weddings or special occasions.', 'womenCategory', 69.99, 4.5, '/productImages/womenCategory/womenjewellery2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Tiffany & Co.', 'Tiffany & Co. Dazzling Diamond Pendant - Add a touch of sophistication to any neckline with this dazzling diamond pendant from Tiffany & Co. Perfect for casual to formal wear.', 'womenCategory', 149.99, 4.7, '/productImages/womenCategory/womenjewellery3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Silver');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Adidas', 'Adidas Denim Blue Shorts - Embrace classic style with these denim shorts from Adidas. Designed for both comfort and fashion, they''re ideal for casual wear during warmer weather.', 'menCategory', 70.99, 4.8, '/productImages/menCategory/mendress2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Gap', 'Gap Pink T-shirt - Add a pop of color to your wardrobe with this casual pink t-shirt from Gap. Made from soft cotton, it is perfect for everyday wear.', 'menCategory', 79.90, 4.6, '/productImages/menCategory/mendress7.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Pink');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Zara', 'Zara Blue Suit - Make a statement with this classic blue suit from Zara. Tailored for a modern fit and crafted from high-quality materials, it iss perfect for formal occasions.', 'menCategory', 1000.00, 4.4, '/productImages/menCategory/mendress8.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Levi Strauss & Co.', 'Levi Strauss & Co. Red T-shirt - Stand out with this iconic red t-shirt from Levi Strauss & Co. Made from premium cotton, it offers superior comfort and durability.', 'menCategory', 1000.00, 4.3, '/productImages/menCategory/mendress9.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Red');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Zara', 'Zara Stylish White Shirt and Navy Blue Jeans - Elevate your casual look with this stylish combination from Zara. Featuring a white shirt and navy blue jeans, it is comfortable yet fashionable attire for everyday wear.', 'womenCategory', 19.99, 4.2, '/productImages/womenCategory/womendress3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'White and Navy Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Zara', 'Zara Chic Printed Dress - Make a statement with this chic printed dress from Zara. With a flattering fit, it is effortlessly stylish attire suitable for both daytime and evening events.', 'womenCategory', 199.99, 4.9, '/productImages/womenCategory/womendress11.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Printed');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Steve Madden', 'Steve Madden Trendy Brown Boots - Step out in style with these trendy brown boots from Steve Madden. Perfect for adding a stylish touch to any outfit, from casual to dressy.', 'womenCategory', 59.99, 4.3, '/productImages/womenCategory/womenfootwear1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('ALDO', 'ALDO Fashionable Yellow Loafers - Add a pop of color to your ensemble with these fashionable yellow loafers from ALDO. Versatile footwear that adds a modern twist to any outfit.', 'womenCategory', 79.99, 4.5, '/productImages/womenCategory/womenfootwear2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Yellow');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Michael Kors', 'Michael Kors Shimmery Gold Heels - Make a glamorous statement with these shimmery gold heels from Michael Kors. Perfect for evening events or formal occasions where you want to make a statement.', 'womenCategory', 99.99, 4.8, '/productImages/womenCategory/womenfootwear3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Forever 21', 'Forever 21 Block Heels in Vibrant Orange - Add a playful yet chic element to any outfit with these block heels in a vibrant orange hue from Forever 21. Perfect for adding a pop of color to your ensemble.', 'womenCategory', 29.99, 4.3, '/productImages/womenCategory/womenfootwear4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Orange');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Gucci', 'Gucci Classic Black Heels - Step out in style with these classic black heels from Gucci. Versatile footwear that pairs well with both casual and formal outfits.', 'womenCategory', 39.99, 4.8, '/productImages/womenCategory/womenfootwear5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Jimmy Choo', 'Jimmy Choo Elegant Golden Heels - Elevate your look with these elegant golden heels adorned with intricate details from Jimmy Choo. Adds a touch of luxury to any ensemble.', 'womenCategory', 129.99, 4.6, '/productImages/womenCategory/womenfootwear6.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Pandora', 'Pandora Exquisite Necklace and Earrings Set in Gold - Add a touch of elegance to your outfit with this exquisite necklace and earrings set in gold from Pandora. Perfect for adding a touch of sophistication to any ensemble.', 'womenCategory', 89.99, 4.4, '/productImages/womenCategory/womenjewellery1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Cartier', 'Cartier Exquisite Diamond Ring - Make a statement with this exquisite diamond ring from Cartier. Perfect for engagements, anniversaries, or as a stunning statement piece.', 'womenCategory', 109.99, 4.6, '/productImages/womenCategory/womenjewellery4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Silver and Diamond');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Swarovski', 'Swarovski Stylish Earrings - Add a touch of sparkle to any outfit with these stylish earrings featuring Swarovski crystals. Perfect for casual to formal occasions.', 'womenCategory', 49.99, 4.5, '/productImages/womenCategory/womenjewellery5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Crystal');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Ray-Ban', 'Ray-Ban Classic Black Sunglasses - Stay stylish and protected with these classic black sunglasses from Ray-Ban. Provides both style and protection from the sun.', 'womenCategory', 39.99, 4.3, '/productImages/womenCategory/womensunglasses1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Prada', 'Prada Stylish Sunglasses - Elevate your look with these stylish sunglasses from Prada. Featuring a modern edge, they are perfect for adding a touch of luxury to any outfit.', 'womenCategory', 99.99, 4.7, '/productImages/womenCategory/womensunglasses2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Varies');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('KiddieChic', 'KiddieChic Elegant Black and White T-shirt and Jeans Set - Add a touch of elegance to your little girls wardrobe with this stylish black and white t-shirt paired with black jeans from KiddieChic. Perfect for casual outings or family dinners.', 'kidsCategory', 69.99, 4.3, '/productImages/kidsCategory/girlsclothes5.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Black and White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('LittleSteps', 'LittleSteps Trendy Olive Green Boots - Step out in style with these trendy olive green boots from LittleSteps. Perfect for adventures in the park or outings with friends.', 'kidsCategory', 59.99, 4.3, '/productImages/kidsCategory/kidsfootwear1.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Olive Green');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TinyToes', 'TinyToes Fashionable Grey Sneakers - Brighten up your little ones day with these fashionable grey sneakers from TinyToes. Versatile and stylish, they are perfect for any occasion.', 'kidsCategory', 79.99, 4.5, '/productImages/kidsCategory/kidsfootwear2.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Grey');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('MiniGlam', 'MiniGlam Sparkling Glamorous Shoes - Let your little fashionista sparkle with these glamorous shoes from MiniGlam. Ideal for special occasions or just playing dress-up at home.', 'kidsCategory', 99.99, 4.8, '/productImages/kidsCategory/kidsfootwear3.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Varies');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('BunnyBuddies', 'BunnyBuddies Fluffy Bunny Plush Toy - Bring endless playtime fun to your child with this fluffy bunny plush toy from BunnyBuddies. Soft and huggable, it is your childs new best friend for imaginative adventures.', 'kidsCategory', 24.99, 4.4, '/productImages/kidsCategory/kidstoysandgames2.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('BIBA', 'BIBA Traditional Indian Attire - Embrace traditional Indian fashion with this stunning attire from BIBA. Consisting of a kurta, pants, and a dupatta with intricate embroidery, it is ideal for festive occasions or cultural events.', 'womenCategory', 99.99, 4.5, '/productImages/womenCategory/womendress2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TinyTrendsetters', 'TinyTrendsetters Traditional Kurta Pajama Set - Dress your little gentleman with flair in this traditional kurta pajama set from TinyTrendsetters. Perfect for festive occasions and cultural celebrations.', 'kidsCategory', 24.99, 4.7, '/productImages/kidsCategory/boysclothes4.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Versace', 'Versace Chic Golden Sunglasses - Add a touch of glamour to your ensemble with these chic golden sunglasses from Versace. Elevates any outfit with a touch of Versace luxury and style.', 'womenCategory', 79.99, 4.6, '/productImages/womenCategory/womensunglasses3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Dolce & Gabbana', 'Dolce & Gabbana Trendy Yellow Sunglasses - Make a bold statement with these trendy yellow framed sunglasses from Dolce & Gabbana. Adds a pop of color and personality to any ensemble.', 'womenCategory', 59.99, 4.4, '/productImages/womenCategory/womensunglasses4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Yellow');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Rolex', 'Rolex Stylish Green Watch with Golden Chain - Stay on time and on trend with this stylish green watch with a golden chain from Rolex. Combines precision timekeeping with luxurious design, perfect for any occasion.', 'womenCategory', 299.99, 4.8, '/productImages/womenCategory/womenwatches1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Green and Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Rolex', 'Rolex Luxurious Watch with Exquisite Craftsmanship - Elevate your look with this luxurious watch from Rolex. Exquisite craftsmanship and timeless elegance.', 'womenCategory', 399.99, 4.9, '/productImages/womenCategory/womenwatches2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Michael Kors', 'Michael Kors Elegant Gold Watch - Add a touch of luxury to your wrist with this elegant gold watch from Michael Kors. Perfect for everyday wear or special occasions.', 'womenCategory', 199.99, 4.7, '/productImages/womenCategory/womenwatches3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Fossil', 'Fossil Stylish Black Belt Watch - Stay stylish and punctual with this stylish black belt watch from Fossil. Combines functionality with fashion, perfect for modern women on the go.', 'womenCategory', 149.99, 4.5, '/productImages/womenCategory/womenwatches4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TinyTots', 'TinyTots Vibrant Blue T-shirt and Shorts Set - Prepare your little boy for a day of excitement with this vibrant blue t-shirt paired with comfortable matching shorts from TinyTots. Ideal for playdates or outdoor adventures in the sun.', 'kidsCategory', 129.99, 4.3, '/productImages/kidsCategory/boysclothes1.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('KiddieKraft', 'KiddieKraft Adorable Sweater and Trendy Brown Jeans Set - Keep your little one snug and stylish with this adorable sweater paired with trendy brown jeans from KiddieKraft. Perfect for chilly winter days and family outings.', 'kidsCategory', 99.99, 4.5, '/productImages/kidsCategory/boysclothes2.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Brown and Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('PlayfulPals', 'PlayfulPals Golden Cream Shirt and Jeans Ensemble - Let your child stand out in this golden cream shirt and jeans ensemble from PlayfulPals. Whether it is a playdate or a family gathering, this outfit is sure to make a statement.', 'kidsCategory', 49.99, 4.8, '/productImages/kidsCategory/boysclothes3.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Golden Cream');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CuteKicks', 'CuteKicks Classic Pink Shoes - Step out in style with these classic pink shoes from CuteKicks. Versatile and comfortable, they are perfect for any occasion.', 'kidsCategory', 39.99, 4.8, '/productImages/kidsCategory/kidsfootwear5.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Pink');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('GiraffeGalore', 'GiraffeGalore Gentle Teddy Bear Plush Toy - Let your child snuggle up with this gentle teddy bear plush toy from GiraffeGalore. A lovable friend for encouraging imaginative play and storytelling.', 'kidsCategory', 29.99, 4.5, '/productImages/kidsCategory/kidstoysandgames3.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('H&M', 'H&M Pink Stylish Suit - Make a bold statement with this stylish pink suit from H&M. Complete with a blazer, trousers, and a matching scarf, it is perfect for formal occasions or professional settings.', 'womenCategory', 129.99, 4.3, '/productImages/womenCategory/womendress1.svg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Pink');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('ArtisanAccents', 'ArtisanAccents Handcrafted Decor Pieces - Elevate your home decor with these unique and artistic handcrafted decor pieces from ArtisanAccents.', 'homeAndLivingCategory', 49.99, 4.8, '/productImages/homeAndLivingCategory/HomeDecor2.jpeg', '2024-03-29 11:14:25.626789', '2024-03-29 11:14:25.626789', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Uniqlo', 'Uniqlo White T-shirt - Essential white t-shirt from Uniqlo. Made from soft, breathable fabric for all-day comfort.', 'menCategory', 199.99, 4.9, '/productImages/menCategory/mendress10.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('PlayfulPals', 'PlayfulPals Vibrant Red Boots - Add a pop of color to your little ones outfit with these vibrant red boots from PlayfulPals. Fun and stylish, they are perfect for parties or playdates.', 'kidsCategory', 29.99, 4.3, '/productImages/kidsCategory/kidsfootwear4.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Red');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('SnuggleBuddies', 'SnuggleBuddies Soft Plush Teddy Bear - Snuggle up with this soft plush teddy bear from SnuggleBuddies. The perfect cuddly companion for naptime, playtime, and bedtime snuggles.', 'kidsCategory', 19.99, 4.6, '/productImages/kidsCategory/kidstoysandgames1.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('BuildingBlocks', 'BuildingBlocks Colorful Building Blocks Set - Spark creativity and imagination in children with this colorful building blocks set from BuildingBlocks. Endless possibilities for building and learning.', 'kidsCategory', 39.99, 4.6, '/productImages/kidsCategory/kidstoysandgames4.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Multicolored');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('UnicornMagic', 'UnicornMagic Cozy Dining Sets for Enchanting Adventures - Create enchanting dining experiences with these cozy dining sets from UnicornMagic.', 'kidsCategory', 34.99, 4.7, '/productImages/kidsCategory/kidstoysandgames5.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Various Colors');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('DreamyComfort', 'DreamyComfort Soft and Cozy Bed Linen Set in Soothing Blue - Elevate your sleep experience with this soft and cozy bed linen set in soothing blue from DreamyComfort.', 'homeAndLivingCategory', 99.99, 4.5, '/productImages/homeAndLivingCategory/BedlinenProduct1.jpeg', '2024-03-29 11:13:22.952586', '2024-03-29 11:13:22.952586', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('PlushHaven', 'PlushHaven Elegant Bed Linen Set Crafted for Comfort and Style - Transform your bedroom into a serene retreat with this elegant bed linen set crafted for both comfort and style from PlushHaven.', 'homeAndLivingCategory', 49.99, 4.8, '/productImages/homeAndLivingCategory/BedlinenProduct2.jpeg', '2024-03-29 11:13:22.952586', '2024-03-29 11:13:22.952586', 'Various Colors');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('SerenityStyle', 'SerenityStyle Timeless Bed Linen Set for Peaceful Sleep - Add a touch of sophistication to your bedroom decor with this timeless bed linen set from SerenityStyle.', 'homeAndLivingCategory', 24.99, 4.7, '/productImages/homeAndLivingCategory/BedlinenProduct3.jpeg', '2024-03-29 11:13:22.952586', '2024-03-29 11:13:22.952586', 'Black and White Stripes');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TranquilNest', 'TranquilNest Luxurious Bed Linen Set in Classic Black and White Stripes - Experience ultimate comfort and style with this luxurious bed linen set in classic black and white stripes from TranquilNest.', 'homeAndLivingCategory', 29.99, 4.7, '/productImages/homeAndLivingCategory/BedlinenProduct4.jpeg', '2024-03-29 11:13:22.952586', '2024-03-29 11:13:22.952586', 'Black and White Stripes');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CosyDreams', 'CosyDreams Chic and Stylish Bed Linen Set in Versatile Grey - Create a cozy ambiance in your bedroom with this chic and stylish bed linen set in versatile grey from CosyDreams.', 'homeAndLivingCategory', 19.99, 4.2, '/productImages/homeAndLivingCategory/BedlinenProduct5.jpeg', '2024-03-29 11:13:22.952586', '2024-03-29 11:13:22.952586', 'Grey');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('LuxuryLamps', 'LuxuryLamps Luxurious Lighting Fixtures - Add a touch of opulence to your home decor with these luxurious lighting fixtures from LuxuryLamps.', 'homeAndLivingCategory', 24.99, 4.7, '/productImages/homeAndLivingCategory/HomeDecor3.jpeg', '2024-03-29 11:14:25.626789', '2024-03-29 11:14:25.626789', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CozyThrows', 'CozyThrows Soft and Cozy Throws - Stay warm and comfortable with these soft and cozy throws from CozyThrows.', 'homeAndLivingCategory', 29.99, 4.7, '/productImages/homeAndLivingCategory/HomeDecor4.jpeg', '2024-03-29 11:14:25.626789', '2024-03-29 11:14:25.626789', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Armani', 'Armani Black Office Bag - Elevate your professional look with this sleek and professional black office bag from Armani. Designed for practicality and style.', 'menCategory', 79.90, 4.5, '/productImages/menCategory/menfashionaccessories2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Gucci', 'Gucci Brown Valet - Organize your essentials in style with this luxurious brown valet from Gucci. Crafted from premium materials with the iconic Gucci logo.', 'menCategory', 100.99, 4.8, '/productImages/menCategory/menfashionaccessories3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Polo Ralph Lauren', 'Polo Ralph Lauren Sporty Uranium Blue Cap - Stay stylish and protected from the sun with this sporty uranium blue cap from Polo Ralph Lauren. Made from durable materials for long-lasting wear.', 'menCategory', 29.90, 4.3, '/productImages/menCategory/menfashionaccessories4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Louis Vuitton', 'Louis Vuitton Brown Leather Belt - Complete your look with this classic brown leather belt from Louis Vuitton. Featuring a timeless design with the LV logo.', 'menCategory', 39.00, 4.8, '/productImages/menCategory/menfashionaccessories5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Adidas', 'Adidas White Sneaker Shoes - Stay stylish and comfortable with these white sneaker shoes from Adidas. Perfect for casual wear or sports activities.', 'menCategory', 120000.00, 4.6, '/productImages/menCategory/menfootwear1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Timberland', 'Timberland Casual Brown Shoes - Step out in style with these casual brown shoes from Timberland. Made from premium leather for a rugged yet stylish look.', 'menCategory', 69.00, 4.5, '/productImages/menCategory/menfootwear3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Clarks', 'Clarks Black Oxford Shoes - Complete your look with these classic black Oxford shoes from Clarks. Featuring a timeless design suitable for both formal and casual occasions.', 'menCategory', 14.00, 4.7, '/productImages/menCategory/menfootwear4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Converse', 'Converse Brown Formal Shoes - Make a statement with these brown formal shoes from Converse. Versatile and stylish, perfect for work or special occasions.', 'menCategory', 109.99, 4.6, '/productImages/menCategory/menfootwear5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Fossil', 'Fossil Elegant Brown Wristwatch - Complete your look with this elegant brown wristwatch from Fossil. Featuring a classic design with modern features.', 'menCategory', 99.99, 4.7, '/productImages/menCategory/menwatches1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Brown');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Casio', 'Casio Classic Black Watch - Stay on time with this classic black watch from Casio. Durable and reliable, suitable for everyday wear.', 'menCategory', 79.99, 4.6, '/productImages/menCategory/menwatches2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Tag Heuer', 'Tag Heuer Stylish Silver Chronograph Watch - Make a statement with this stylish silver chronograph watch from Tag Heuer. Precision timekeeping with a sleek design.', 'menCategory', 299.99, 4.8, '/productImages/menCategory/menwatches5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Silver');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Seiko', 'Seiko Durable Gold Titanium Diver Watch - Dive into adventure with this durable gold titanium diver watch from Seiko. Built for underwater exploration with precision accuracy.', 'menCategory', 199.99, 4.7, '/productImages/menCategory/menwatches6.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Fossil', 'Fossil Elegant Gold Watch - Add a touch of elegance to any outfit with this elegant gold watch from Fossil. Perfect for special occasions.', 'menCategory', 149.99, 4.5, '/productImages/menCategory/menwatches7.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gold');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Casio', 'Casio Classic Stainless Steel Watch - Stay stylish and punctual with this classic stainless steel watch from Casio. Sleek design with advanced features.', 'menCategory', 129.99, 4.3, '/productImages/menCategory/menwatches8.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Silver');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CoastalCharm', 'CoastalCharm Rustic Flooring - Bring the beauty of coastal living into your home with these rustic flooring options from CoastalCharm.', 'homeAndLivingCategory', 19.99, 4.2, '/productImages/homeAndLivingCategory/FlooringProduct5.jpeg', '2024-03-29 11:13:56.157111', '2024-03-29 11:13:56.157111', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('FloralFinesse', 'FloralFinesse Beautiful Floral Arrangements - Bring the beauty of nature indoors with these exquisite floral arrangements from FloralFinesse.', 'homeAndLivingCategory', 99.99, 4.5, '/productImages/homeAndLivingCategory/HomeDecor1.jpeg', '2024-03-29 11:14:25.626789', '2024-03-29 11:14:25.626789', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('ChicCushions', 'ChicCushions Stylish and Comfortable Cushions - Elevate your seating area with these stylish and comfortable cushions from ChicCushions.', 'homeAndLivingCategory', 19.99, 4.2, '/productImages/homeAndLivingCategory/HomeDecor5.jpeg', '2024-03-29 11:14:25.626789', '2024-03-29 11:14:25.626789', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('IlluminateInteriors', 'IlluminateInteriors Stylish and Modern Lamps - Illuminate your space with style using these stylish and modern lamps from IlluminateInteriors.', 'homeAndLivingCategory', 99.99, 4.5, '/productImages/homeAndLivingCategory/LampsProduct1.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('UrbanGlow', 'UrbanGlow Trendy and Versatile Lamps - Add urban flair to your home decor with these trendy and versatile lamps from UrbanGlow.', 'homeAndLivingCategory', 49.99, 4.8, '/productImages/homeAndLivingCategory/LampsProduct2.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('VintageVibes', 'VintageVibes Charming Vintage Lamps - Bring a touch of nostalgia to your home decor with these charming vintage lamps from VintageVibes.', 'homeAndLivingCategory', 24.99, 4.7, '/productImages/homeAndLivingCategory/LampsProduct3.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CoastalChic', 'CoastalChic Coastal-Inspired Lamps - Embrace coastal vibes with these chic lamps inspired by coastal living from CoastalChic.', 'homeAndLivingCategory', 29.99, 4.7, '/productImages/homeAndLivingCategory/LampsProduct4.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('MinimalistModern', 'MinimalistModern Sleek and Minimalist Lamps - Elevate your home decor with these sleek and minimalist lamps from MinimalistModern.', 'homeAndLivingCategory', 19.99, 4.2, '/productImages/homeAndLivingCategory/LampsProduct5.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('RusticElegance', 'RusticElegance Warm and Inviting Lamps - Add warmth and charm to your home decor with these rustic lamps from RusticElegance.', 'homeAndLivingCategory', 39.99, 4.6, '/productImages/homeAndLivingCategory/LampsProduct6.jpeg', '2024-03-29 11:15:38.486497', '2024-03-29 11:15:38.486497', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Marc Jacobs', 'Marc Jacobs Daisy Perfume - Fresh and floral fragrance from Marc Jacobs. Perfect for everyday wear.', 'menCategory', 59.90, 4.3, '/productImages/menCategory/menfashionaccessories1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Nike', 'Nike Sporty Cool Sneakers - Stay active with these sporty sneakers from Nike. With a modern design, they are lightweight and durable, ideal for running or training.', 'menCategory', 89.99, 4.4, '/productImages/menCategory/menfootwear2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Ray-Ban', 'Ray-Ban Classic Sunglasses - Protect your eyes in style with these timeless classic sunglasses from Ray-Ban. Featuring an iconic design with UV protection.', 'menCategory', 49.99, 4.5, '/productImages/menCategory/mensunglasses1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Oakley', 'Oakley Stylish Wayfarer Sunglasses - Stay stylish and protected during outdoor activities with these stylish Wayfarer sunglasses from Oakley. Designed with impact resistance.', 'menCategory', 39.99, 4.3, '/productImages/menCategory/mensunglasses2.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Timex', 'Timex Sporty Digital Watch - Stay active with this sporty digital watch from Timex. Built for active lifestyles with water resistance.', 'menCategory', 59.99, 4.4, '/productImages/menCategory/menwatches3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Rolex', 'Rolex Luxurious Watch - Elevate your style with this luxurious watch from Rolex. Exquisite craftsmanship and timeless elegance.', 'menCategory', 399.99, 4.9, '/productImages/menCategory/menwatches4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Versace', 'Fresh Air Cologne - A captivating cologne for men by Versace, featuring a refreshing blend of citrus and woody notes, perfect for any occasion.', 'beautyCategory', 99.99, 4.5, '/productImages/beautyCategory/fragranceProduct1.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Dior', 'Sporty Spice Perfume - A dynamic and invigorating perfume for women by Dior, ideal for those with an active lifestyle.', 'beautyCategory', 49.99, 4.8, '/productImages/beautyCategory/fragranceProduct2.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Chanel', 'Elegant Essence Perfume - A sophisticated fragrance for women by Chanel, exuding timeless elegance and charm.', 'beautyCategory', 24.99, 4.7, '/productImages/beautyCategory/fragranceProduct3.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Frederic Malle', 'Classic Charm Perfume - A classic and feminine perfume for women by Frederic Malle, featuring a blend of floral and fruity notes.', 'beautyCategory', 29.99, 4.7, '/productImages/beautyCategory/fragranceProduct4.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Necessarie', 'Active Scent Deodorant - Stay fresh and confident all day with this active deodorant by Necessarie, designed for the modern man on the go.', 'beautyCategory', 19.99, 4.2, '/productImages/beautyCategory/fragranceProduct5.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Olaplex', 'Gentle Care Shampoo - Pamper your hair with this luxurious shampoo by Olaplex, formulated to nourish and strengthen your locks.', 'beautyCategory', 39.99, 4.6, '/productImages/beautyCategory/HaircareProduct1.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('THE Hair SHOP', 'Intensive Hair Mask - Revitalize and hydrate your hair with this nourishing hair mask by the hair care, designed to restore shine and softness.', 'beautyCategory', 79.99, 4.6, '/productImages/beautyCategory/HaircareProduct2.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Nike', 'Nike Blue Blazer - Elevate your style with this comfortable blazer for men from Nike. Crafted with premium materials, it''s perfect for any occasion, offering both comfort and sophistication.', 'menCategory', 91.99, 4.5, '/productImages/menCategory/mendress1.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Calvin Klein', 'Calvin Klein Denim Blue Jacket - Make a statement with this timeless denim jacket from Calvin Klein. With a modern twist on a classic design, it''s versatile and durable, suitable for any casual outfit.', 'menCategory', 25.99, 4.7, '/productImages/menCategory/mendress3.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Blue');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Tommy Hilfiger', 'Tommy Hilfiger Black and White T-shirt - Add a touch of iconic style to your wardrobe with this classic black and white striped t-shirt from Tommy Hilfiger. Made from soft cotton, it offers maximum comfort without compromising on style.', 'menCategory', 28.99, 4.7, '/productImages/menCategory/mendress4.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Black and White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Puma', 'Puma Gray T-shirt and Shorts Set - Stay stylish and comfortable with this grey t-shirt and shorts set from Puma. Whether lounging or working out, it''s the perfect choice for both relaxation and activity.', 'menCategory', 1000.00, 4.2, '/productImages/menCategory/mendress5.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gray');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Ralph Lauren', 'Ralph Lauren Gray Blazer with White Shirt - Elevate your formal attire with this elegant gray blazer paired with a crisp white shirt from Ralph Lauren. Ideal for formal occasions or business meetings.', 'menCategory', 1000.00, 4.6, '/productImages/menCategory/mendress6.jpeg', '2024-03-16 07:58:03.679794', '2024-03-16 07:58:03.679794', 'Gray');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('KiddoChic', 'KiddoChic Classic Black T-shirt - Add a touch of cool to your little boys wardrobe with this classic black t-shirt from KiddoChic. Versatile and comfortable, it is a must-have for everyday wear.', 'kidsCategory', 29.99, 4.7, '/productImages/kidsCategory/boysclothes5.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Black');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('LittleAngels', 'LittleAngels Beautiful Printed Dress - Let your little girl twirl with delight in this beautiful printed dress from LittleAngels. Perfect for parties, picnics, or any special occasion.', 'kidsCategory', 19.99, 4.2, '/productImages/kidsCategory/girlsclothes1.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Printed');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TinyTrends', 'TinyTrends Stylish Black and Red Track Suit - Keep your little fashionista on trend with this stylish black and red track suit from TinyTrends. Great for active play or lounging around.', 'kidsCategory', 39.99, 4.6, '/productImages/kidsCategory/girlsclothes2.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'Black and Red');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CuteCouture', 'CuteCouture Adorable White Dress for Baby Girls - Make every day special with this adorable white dress for baby girls from CuteCouture. Soft and comfortable, it is perfect for playdates or family gatherings.', 'kidsCategory', 79.99, 4.6, '/productImages/kidsCategory/girlsclothes3.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('TinyTrendsetters', 'TinyTrendsetters Boho-Inspired White Dress - Let your little princess shine in this boho-inspired white dress from TinyTrendsetters. Ideal for birthdays, weddings, or any special occasion.', 'kidsCategory', 149.99, 4.4, '/productImages/kidsCategory/girlsclothes4.jpeg', '2024-03-18 19:52:38.683768', '2024-03-18 19:52:38.683768', 'White');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('WarmWood', 'WarmWood Classic Wooden Flooring - Enhance the beauty of your home with this timeless classic wooden flooring from WarmWood.', 'homeAndLivingCategory', 99.99, 4.5, '/productImages/homeAndLivingCategory/FlooringProduct1.jpeg', '2024-03-29 11:13:56.157111', '2024-03-29 11:13:56.157111', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Laaor', 'Argan Hair Oil  - Achieve silky-smooth hair with this Argan Oil by Laaor, formulated for intense hydration and frizz control.', 'beautyCategory', 149.99, 4.4, '/productImages/beautyCategory/HaircareProduct3.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    (' Garnier', 'Strong Hold Hair Gel - Style your hair effortlessly with this strong hold hair gel by Garnier, providing long-lasting hold and definition.', 'beautyCategory', 69.99, 4.3, '/productImages/beautyCategory/HaircareProduct4.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Sukin', 'Scalp Scrub - Rejuvenate your scalp with this invigorating scalp scrub by Sukin, formulated to exfoliate and promote healthy hair growth.', 'beautyCategory', 199.99, 4.9, '/productImages/beautyCategory/HaircareProduct5.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('NARS', 'Bioglow Foundation - Achieve a radiant complexion with this illuminating foundation by NARS, offering a natural glow and flawless coverage.', 'beautyCategory', 59.99, 4.3, '/productImages/beautyCategory/MakeupProduct1.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Maybelline', 'Volumizing Mascara - Enhance your lashes with this volumizing mascara by Maybelline, designed to add length and volume for a bold look.', 'beautyCategory', 79.99, 4.5, '/productImages/beautyCategory/MakeupProduct2.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Revlon', 'Eyeshadow Palette - Create stunning eye looks with this versatile eyeshadow palette by Revlon, featuring a range of shades for endless possibilities.', 'beautyCategory', 99.99, 4.8, '/productImages/beautyCategory/MakeupProduct3.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('NYX', 'Matte Lipstick - Make a statement with this vibrant matte lipstick by NYX, offering long-lasting color and comfortable wear.', 'beautyCategory', 29.99, 4.3, '/productImages/beautyCategory/MakeupProduct4.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Lumene', 'Luminous Lip Color - Achieve luscious lips with this luminous lip color by Lumene, featuring a hydrating formula and vibrant shades.', 'beautyCategory', 39.99, 4.8, '/productImages/beautyCategory/MakeupProduct5.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Charlotte Tilbury', 'Red Lipstick - Add a pop of color to your lips with this bold red lipstick by Charlotte Tilbury, offering intense pigmentation and long-lasting wear.', 'beautyCategory', 129.99, 4.6, '/productImages/beautyCategory/MakeupProduct6.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Red');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('OPI', 'Yellow Nail Polish - Elevate your manicure with this vibrant yellow nail polish by OPI, offering smooth application and a high-gloss finish.', 'beautyCategory', 89.99, 4.4, '/productImages/beautyCategory/MakeupProduct7.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Yellow');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Essie', 'Baby Pink Nail Polish - Achieve a chic and feminine look with this baby pink nail polish by Essie, providing long-lasting color and shine.', 'beautyCategory', 69.99, 4.5, '/productImages/beautyCategory/MakeupProduct8.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Pink');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Curology', 'Gentle Cleanser - Cleanse your skin gently yet effectively with this gentle cleanser by Curology, suitable for all skin types.', 'beautyCategory', 149.99, 4.7, '/productImages/beautyCategory/SkinProduct1.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Necessarie', 'Nourishing Body Lotion - Hydrate and nourish your skin with this nourishing body lotion by Necessarie, formulated to restore moisture and soften skin.', 'beautyCategory', 109.99, 4.6, '/productImages/beautyCategory/SkinProduct2.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Completely Bare', 'Facial Moisturizer - Keep your skin hydrated and protected with this facial moisturizer by Completely Bare, offering SPF protection and long-lasting hydration.', 'beautyCategory', 49.99, 4.5, '/productImages/beautyCategory/SkinProduct3.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CLINIQUE', 'Under Eye Gel - Combat puffiness and dark circles with this soothing under eye gel by CLINIQUE, formulated with natural ingredients for delicate skin.', 'beautyCategory', 39.99, 4.3, '/productImages/beautyCategory/SkinProduct4.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Coppertone', 'Sunscreen - Protect your skin from harmful UV rays with this sunscreen by Coppertone, offering broad-spectrum protection and water-resistant formula.', 'beautyCategory', 99.99, 4.7, '/productImages/beautyCategory/SkinProduct5.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CeraVe', 'Hydrating Face Serum - Replenish moisture and restore radiance to your skin with this hydrating face serum by CeraVe, enriched with ceramides and hyaluronic acid.', 'beautyCategory', 79.99, 4.6, '/productImages/beautyCategory/SkinProduct6.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('Eucerin', 'Body Lotion - Pamper your skin with this nourishing body lotion by Eucerin, formulated to provide long-lasting hydration and smoothness.', 'beautyCategory', 59.99, 4.4, '/productImages/beautyCategory/SkinProduct7.jpeg', '2024-04-05 21:38:12.761909', '2024-04-05 21:38:12.761909', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('CosyCarpets', 'CosyCarpets Soft and Plush Carpet Flooring - Create a cozy atmosphere in your living space with these soft and plush carpet flooring options from CosyCarpets.', 'homeAndLivingCategory', 49.99, 4.8, '/productImages/homeAndLivingCategory/FlooringProduct2.jpeg', '2024-03-29 11:13:56.157111', '2024-03-29 11:13:56.157111', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('SleekStone', 'SleekStone Modern Stone Flooring - Elevate the style of your home with these modern stone flooring tiles from SleekStone.', 'homeAndLivingCategory', 24.99, 4.7, '/productImages/homeAndLivingCategory/FlooringProduct3.jpeg', '2024-03-29 11:13:56.157111', '2024-03-29 11:13:56.157111', 'Other');
INSERT INTO public.products
    (product_brand_name, product_description, product_category, product_price, product_rating, product_image_url, create_date, update_date, product_color)
VALUES
    ('RoyalTiles', 'RoyalTiles Elegant Tile Flooring - Add sophistication to any room with these elegant tile flooring options from RoyalTiles.', 'homeAndLivingCategory', 29.99, 4.7, '/productImages/homeAndLivingCategory/FlooringProduct4.jpeg', '2024-03-29 11:13:56.157111', '2024-03-29 11:13:56.157111', 'Other');


INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (4, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (4, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (4, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (4, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (4, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (5, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (1, 'M', 2, '2024-04-05 10:56:54.134487', '2024-04-05 10:56:54.134487');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (5, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (5, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (5, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (5, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (6, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (8, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (6, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (6, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (6, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (1, 'L', 1, '2024-04-05 10:56:54.134487', '2024-04-05 10:56:54.134487');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (6, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (7, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (7, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (1, 'XXL', -1, '2024-04-05 10:56:54.134487', '2024-04-05 10:56:54.134487');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (7, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (7, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (8, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (8, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (2, 'M', 0, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (7, 'XL', 1, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (2, 'L', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (2, 'XL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (2, 'XXL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (3, 'S', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (3, 'M', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (3, 'L', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (3, 'XL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (3, 'XXL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'S', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'M', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'L', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'XL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'XXL', 10, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (8, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (8, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (9, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (9, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (9, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (9, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (9, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (10, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (10, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (10, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (10, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (10, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (11, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (11, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (11, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (11, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (12, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (12, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (12, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (12, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (12, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (13, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (13, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (13, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (13, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (13, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (14, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (14, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (14, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (14, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (14, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (15, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (15, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (15, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (15, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (15, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (16, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (16, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (16, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (16, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (16, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (17, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (17, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (17, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (17, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (17, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (18, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (18, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (18, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (18, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (18, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (19, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (19, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (19, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (19, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (19, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (20, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (20, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (20, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (20, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (21, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (21, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (21, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (21, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (21, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (22, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (22, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (22, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (22, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (22, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (23, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (23, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (23, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (23, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (23, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (24, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (24, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (24, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (24, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (24, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (25, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (25, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (25, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (25, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (25, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (26, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (26, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (26, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (26, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (2, 'S', 1, '2024-04-05 18:49:56.455263', '2024-04-05 18:49:56.455263');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (11, 'S', 4, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (20, 'M', 7, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (26, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (27, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (27, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (27, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (27, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (27, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (28, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (28, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (28, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (28, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (28, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (29, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (29, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (29, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (29, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (29, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (30, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (31, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (31, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (31, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (31, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (32, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (32, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (32, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (32, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (33, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (33, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (33, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (33, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (33, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (34, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (34, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (34, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (34, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (35, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (35, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (35, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (35, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (35, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (36, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (36, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (36, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (36, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (36, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (37, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (37, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (37, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (37, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (37, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (38, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (38, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (38, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (38, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (38, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (39, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (39, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (39, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (39, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (39, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (40, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (40, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (40, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (40, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (41, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (41, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (41, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (41, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (41, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (42, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (42, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (42, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (42, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (42, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (43, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (43, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (43, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (43, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (43, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (44, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (44, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (44, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (44, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (44, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (45, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (45, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (45, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (45, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (45, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (46, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (46, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (46, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (46, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (46, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (47, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (47, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (47, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (47, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (47, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (48, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (48, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (48, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (48, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (48, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (49, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (49, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (49, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (49, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (49, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (50, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (50, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (50, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (50, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (50, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (51, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (51, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (51, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (51, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (51, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (52, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (52, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (52, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (52, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (52, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (53, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (53, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (53, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (53, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (53, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (31, 'S', 4, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (40, 'XL', 7, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (54, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (54, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (54, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (54, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (54, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (55, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (55, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (55, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (55, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (55, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (56, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (56, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (56, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (56, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (56, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (57, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (57, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (57, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (57, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (57, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (58, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (58, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (58, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (58, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (58, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (59, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (59, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (59, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (59, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (59, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (60, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (60, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (60, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (60, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (60, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (61, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (61, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (61, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (61, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (62, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (62, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (62, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (62, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (62, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (63, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (63, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (63, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (63, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (63, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (64, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (64, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (64, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (64, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (64, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (65, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (65, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (65, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (65, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (66, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (66, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (66, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (66, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (67, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (67, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (67, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (67, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (67, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (68, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (68, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (68, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (68, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (68, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (69, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (69, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (69, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (69, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (69, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (70, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (70, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (70, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (70, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (70, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (71, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (71, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (71, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (71, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (71, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (72, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (72, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (72, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (72, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (72, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (73, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (73, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (73, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (73, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (73, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (74, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (74, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (74, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (74, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (74, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (75, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (75, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (75, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (75, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (75, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (76, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (76, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (76, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (76, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (76, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (77, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (77, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (77, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (77, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (77, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (78, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (78, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (78, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (78, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (78, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (79, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (79, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (79, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (79, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (79, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (80, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (80, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (80, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (80, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (80, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (65, 'S', 4, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (66, 'S', 1, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (81, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (81, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (81, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (81, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (82, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (82, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (82, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (82, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (83, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (83, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (83, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (83, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (83, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (84, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (84, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (84, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (84, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (84, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (85, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (85, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (85, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (85, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (85, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (86, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (86, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (86, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (86, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (86, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (87, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (87, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (87, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (87, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (87, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (88, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (88, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (88, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (88, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (88, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (89, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (89, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (89, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (89, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (89, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (90, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (90, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (90, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (90, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (90, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (91, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (91, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (91, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (91, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (91, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (92, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (92, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (92, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (92, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (92, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (93, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (93, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (93, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (93, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (93, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (94, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (94, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (94, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (94, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (94, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (95, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (95, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (95, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (95, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (95, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (96, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (96, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (96, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (96, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (96, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (97, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (97, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (97, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (97, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (97, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (98, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (98, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (98, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (98, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (98, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (99, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (99, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (99, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (99, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (99, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (100, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (100, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (100, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (100, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (100, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'S', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'M', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'L', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'XL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'XXL', 5, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (81, 'S', 4, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (61, 'S', 2, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (32, 'S', 1, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (82, 'S', 1, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (34, 'S', 1, '2024-04-05 18:55:37.564906', '2024-04-05 18:55:37.564906');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (1, 'XL', 8, '2024-04-05 10:56:54.134487', '2024-04-05 10:56:54.134487');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (1, 'S', 27, '2024-04-05 10:56:54.134487', '2024-04-05 10:56:54.134487');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'S', 3, '2024-04-16 17:42:59.081445', '2024-04-16 17:42:59.081445');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'M', 1, '2024-04-16 17:42:59.081445', '2024-04-16 17:42:59.081445');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'L', 1, '2024-04-16 17:42:59.081445', '2024-04-16 17:42:59.081445');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'XL', 3, '2024-04-16 17:42:59.081445', '2024-04-16 17:42:59.081445');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (101, 'XXL', 1, '2024-04-16 17:42:59.081445', '2024-04-16 17:42:59.081445');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (102, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (102, 'M', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (102, 'L', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (102, 'XL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (102, 'XXL', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (103, 'S', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (103, 'M', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (103, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (103, 'XL', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (103, 'XXL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (104, 'S', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (104, 'M', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (104, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (104, 'XL', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (104, 'XXL', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (105, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (105, 'M', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (105, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (105, 'XL', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (105, 'XXL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (106, 'S', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (106, 'M', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (106, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (106, 'XL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (106, 'XXL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (107, 'S', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (107, 'M', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (107, 'L', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (107, 'XL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (107, 'XXL', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (108, 'S', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (108, 'M', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (108, 'L', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (108, 'XL', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (108, 'XXL', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (109, 'S', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (109, 'M', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (109, 'L', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (109, 'XL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (109, 'XXL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (110, 'S', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (110, 'M', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (110, 'L', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (110, 'XL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (110, 'XXL', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (111, 'S', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (111, 'M', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (111, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (111, 'XL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (111, 'XXL', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (112, 'S', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (112, 'M', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (112, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (112, 'XL', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (112, 'XXL', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (113, 'S', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (113, 'M', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (113, 'L', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (113, 'XL', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (113, 'XXL', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (114, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (114, 'M', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (114, 'L', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (114, 'XL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (114, 'XXL', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (115, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (115, 'M', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (115, 'L', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (115, 'XL', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (115, 'XXL', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (116, 'S', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (116, 'M', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (116, 'L', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (116, 'XL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (116, 'XXL', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (117, 'S', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (117, 'M', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (117, 'L', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (117, 'XL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (117, 'XXL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (118, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (118, 'M', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (118, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (118, 'XL', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (118, 'XXL', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (119, 'S', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (119, 'M', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (119, 'L', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (119, 'XL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (119, 'XXL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (120, 'S', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (120, 'M', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (120, 'L', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (120, 'XL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (120, 'XXL', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (121, 'S', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (121, 'M', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (121, 'L', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (121, 'XL', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (121, 'XXL', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (122, 'S', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (122, 'M', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (122, 'L', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (122, 'XL', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (122, 'XXL', 8, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (123, 'S', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (123, 'M', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (123, 'L', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (123, 'XL', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (123, 'XXL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (124, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (124, 'M', 7, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (124, 'L', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (124, 'XL', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (124, 'XXL', 5, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (125, 'S', 4, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (125, 'M', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (125, 'L', 1, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (125, 'XL', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (125, 'XXL', 3, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (126, 'S', 10, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (126, 'M', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (126, 'L', 2, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (126, 'XL', 9, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');
INSERT INTO products_quantity
    (product_id, product_size, product_size_quantity, create_date, update_date)
VALUES
    (126, 'XXL', 6, '2024-04-17 01:01:39.714219', '2024-04-17 01:01:39.714219');