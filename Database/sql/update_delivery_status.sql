CREATE OR REPLACE FUNCTION public.update_delivery_status
()
    RETURNS void
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN
    UPDATE user_order
    SET delivery_status = CASE
                            WHEN LOWER(status) = 'pending' THEN 
                                CASE 
                                    WHEN delivery_status = 'Ordered' THEN 'Processing'
                                    WHEN delivery_status = 'Processing' THEN 'Shipped'
                                    WHEN delivery_status = 'Shipped' THEN 'In Transit'
                                    WHEN delivery_status = 'In Transit' THEN 'Out for Delivery'
                                    WHEN delivery_status = 'Out for Delivery' THEN 'Delivered'
                                    ELSE delivery_status
                                END
                            ELSE delivery_status
                         END    
    WHERE LOWER(status) = 'completed' OR LOWER(status) = 'pending';

    RAISE NOTICE 'Delivery status updated successfully';
END;
$BODY$;

ALTER FUNCTION public.update_delivery_status()
    OWNER TO postgres;
