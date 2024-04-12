#!/bin/sh
export PGPASSWORD=password

while :
do
    psql -U postgres -w -d ShoppingAppDatabase -h localhost -p 5432 -c "SELECT update_delivery_status()"
    echo "Delivery status updated..."
    sleep 60  # Adjust the sleep duration as needed
done
