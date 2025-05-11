-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_DELIVERED', 'DELIVERED');

-- CreateTable
CREATE TABLE "suppliers" (
    "supplier_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "product_types" (
    "type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profit_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "units" (
    "unit_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buy_price" DECIMAL(65,30) NOT NULL,
    "sell_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "supplier_id" TEXT,
    "type" TEXT,
    "unit" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "services" (
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "inventory_reports" (
    "report_id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "inventory_reports_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "inventory_report_details" (
    "report_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "begin_stock" INTEGER NOT NULL,
    "buy_quantity" INTEGER NOT NULL DEFAULT 0,
    "sell_quantity" INTEGER NOT NULL,
    "end_stock" INTEGER NOT NULL,

    CONSTRAINT "inventory_report_details_pkey" PRIMARY KEY ("report_id","product_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "fullname" TEXT,
    "profile_pic" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "reset_password_token" TEXT,
    "reset_password_token_expires_at" TIMESTAMP(3),
    "verification_token" TEXT,
    "verification_token_expires_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "purschase_orders" (
    "purchase_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "purschase_orders_pkey" PRIMARY KEY ("purchase_order_id")
);

-- CreateTable
CREATE TABLE "purschase_order_details" (
    "purchase_order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "purschase_order_details_pkey" PRIMARY KEY ("purchase_order_id","product_id")
);

-- CreateTable
CREATE TABLE "sales_orders" (
    "sales_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplier_id" TEXT NOT NULL,

    CONSTRAINT "sales_orders_pkey" PRIMARY KEY ("sales_order_id")
);

-- CreateTable
CREATE TABLE "sales_order_details" (
    "sales_order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "sales_order_details_pkey" PRIMARY KEY ("sales_order_id","product_id")
);

-- CreateTable
CREATE TABLE "service_orders" (
    "service_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "total_paid" DECIMAL(65,30) NOT NULL,
    "total_remaining" DECIMAL(65,30) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "service_orders_pkey" PRIMARY KEY ("service_order_id")
);

-- CreateTable
CREATE TABLE "service_order_details" (
    "service_order_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "extra_cost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "calculated_price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "paid" DECIMAL(65,30) NOT NULL,
    "remaining" DECIMAL(65,30) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_DELIVERED',

    CONSTRAINT "service_order_details_pkey" PRIMARY KEY ("service_order_id","service_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_types_name_key" ON "product_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "units_name_key" ON "units"("name");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_password_token_key" ON "users"("reset_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_verification_token_key" ON "users"("verification_token");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("supplier_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_type_fkey" FOREIGN KEY ("type") REFERENCES "product_types"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unit_fkey" FOREIGN KEY ("unit") REFERENCES "units"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_report_details" ADD CONSTRAINT "inventory_report_details_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "inventory_reports"("report_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_report_details" ADD CONSTRAINT "inventory_report_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purschase_orders" ADD CONSTRAINT "purschase_orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purschase_order_details" ADD CONSTRAINT "purschase_order_details_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purschase_orders"("purchase_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purschase_order_details" ADD CONSTRAINT "purschase_order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_orders" ADD CONSTRAINT "sales_orders_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_details" ADD CONSTRAINT "sales_order_details_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_orders"("sales_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_details" ADD CONSTRAINT "sales_order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_orders" ADD CONSTRAINT "service_orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_order_details" ADD CONSTRAINT "service_order_details_service_order_id_fkey" FOREIGN KEY ("service_order_id") REFERENCES "service_orders"("service_order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_order_details" ADD CONSTRAINT "service_order_details_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- TRIGGER Cập nhật end_stock khi buy_quantity || sell_quantity thay đổi

CREATE OR REPLACE FUNCTION update_end_stock()
RETURNS TRIGGER AS $$
BEGIN
    NEW.end_stock := NEW.begin_stock + NEW.purchase_quantity - NEW.sell_quantity;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_update_end_stock
BEFORE INSERT OR UPDATE ON inventory_report_details
FOR EACH ROW
EXECUTE FUNCTION update_end_stock();

-- TRIGGER Cập nhật purchase_quantity khi thêm purchase order mới
CREATE OR REPLACE FUNCTION update_purchase_quantity()
RETURNS TRIGGER AS $$
DECLARE
    current_report_id TEXT;
BEGIN
    SELECT report_id INTO current_report_id
    FROM inventory_reports
    WHERE month = EXTRACT(MONTH FROM CURRENT_DATE)
    AND year = EXTRACT(YEAR FROM CURRENT_DATE);

    IF current_report_id IS NULL THEN
        current_report_id := gen_random_uuid()::TEXT;
        INSERT INTO inventory_reports (report_id, month, year)
        VALUES (current_report_id, EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE));
    END IF;

    INSERT INTO inventory_report_details (
        report_id,
        product_id,
        begin_stock,
        purchase_quantity,
        sell_quantity,
        end_stock
    )
    VALUES (
        current_report_id,
        NEW.product_id,
        COALESCE((
            SELECT end_stock 
            FROM inventory_report_details 
            WHERE product_id = NEW.product_id 
            AND report_id IN (
                SELECT report_id 
                FROM inventory_reports 
                WHERE (year < EXTRACT(YEAR FROM CURRENT_DATE)) 
                OR (year = EXTRACT(YEAR FROM CURRENT_DATE) AND month < EXTRACT(MONTH FROM CURRENT_DATE))
                ORDER BY year DESC, month DESC 
                LIMIT 1
            )
        ), 0),
        NEW.quantity,
        0,
        COALESCE((
            SELECT end_stock 
            FROM inventory_report_details 
            WHERE product_id = NEW.product_id 
            AND report_id IN (
                SELECT report_id 
                FROM inventory_reports 
                WHERE (year < EXTRACT(YEAR FROM CURRENT_DATE)) 
                OR (year = EXTRACT(YEAR FROM CURRENT_DATE) AND month < EXTRACT(MONTH FROM CURRENT_DATE))
                ORDER BY year DESC, month DESC 
                LIMIT 1
            )
        ), 0) + NEW.quantity
    )
    ON CONFLICT (report_id, product_id) 
    DO UPDATE SET
        purchase_quantity = inventory_report_details.purchase_quantity + NEW.quantity,
        end_stock = inventory_report_details.begin_stock + inventory_report_details.purchase_quantity + NEW.quantity - inventory_report_details.sell_quantity;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_purchase_quantity
AFTER INSERT ON purchase_order_details
FOR EACH ROW
EXECUTE FUNCTION update_purchase_quantity();

-- TRIGGER Cập nhật total_price khi quantity thay đổi trong sales_order_details
CREATE OR REPLACE FUNCTION update_sales_order_total_price()
RETURNS TRIGGER AS $$
BEGIN
    NEW.total_price := (
        SELECT sell_price * CAST(NEW.quantity AS INTEGER)
        FROM products
        WHERE product_id = NEW.product_id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_sales_order_total_price
BEFORE INSERT OR UPDATE OF quantity ON sales_order_details
FOR EACH ROW
EXECUTE FUNCTION update_sales_order_total_price();

-- TRIGGER Kiểm tra số lượng bán và cập nhật sell_quantity
CREATE OR REPLACE FUNCTION validate_sales_quantity()
RETURNS TRIGGER AS $$
DECLARE
    current_report_id TEXT;
    available_stock INTEGER;
BEGIN
    SELECT report_id INTO current_report_id
    FROM inventory_reports
    WHERE month = EXTRACT(MONTH FROM CURRENT_DATE)
    AND year = EXTRACT(YEAR FROM CURRENT_DATE);

    IF current_report_id IS NULL THEN
        current_report_id := gen_random_uuid()::TEXT;
        INSERT INTO inventory_reports (report_id, month, year)
        VALUES (current_report_id, EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE));
    END IF;

    SELECT end_stock INTO available_stock
    FROM inventory_report_details
    WHERE report_id = current_report_id
    AND product_id = NEW.product_id;

    IF available_stock IS NULL THEN
        SELECT end_stock INTO available_stock
        FROM inventory_report_details
        WHERE product_id = NEW.product_id
        AND report_id IN (
            SELECT report_id
            FROM inventory_reports
            WHERE (year < EXTRACT(YEAR FROM CURRENT_DATE))
            OR (year = EXTRACT(YEAR FROM CURRENT_DATE) AND month < EXTRACT(MONTH FROM CURRENT_DATE))
            ORDER BY year DESC, month DESC
            LIMIT 1
        );

        available_stock := COALESCE(available_stock, 0);

        INSERT INTO inventory_report_details (
            report_id,
            product_id,
            begin_stock,
            purchase_quantity,
            sell_quantity,
            end_stock
        )
        VALUES (
            current_report_id,
            NEW.product_id,
            available_stock,
            0,
            0,
            available_stock
        );
    END IF;

    IF CAST(NEW.quantity AS INTEGER) > available_stock THEN
        RAISE EXCEPTION 'Số lượng bán (%) vượt quá số lượng tồn kho hiện có (%)', 
            NEW.quantity, available_stock;
    END IF;

    UPDATE inventory_report_details
    SET 
        sell_quantity = sell_quantity + CAST(NEW.quantity AS INTEGER),
        end_stock = begin_stock + purchase_quantity - (sell_quantity + CAST(NEW.quantity AS INTEGER))
    WHERE report_id = current_report_id
    AND product_id = NEW.product_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_sales_quantity
BEFORE INSERT ON sales_order_details
FOR EACH ROW
EXECUTE FUNCTION validate_sales_quantity();

