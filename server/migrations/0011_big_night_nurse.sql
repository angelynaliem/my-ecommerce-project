CREATE TABLE IF NOT EXISTS "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"rating" real NOT NULL,
	"string" text NOT NULL,
	"productID" serial NOT NULL,
	"comment" text NOT NULL,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_string_user_id_fk" FOREIGN KEY ("string") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "productIdx" ON "reviews" USING btree ("productID");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userIdx" ON "reviews" USING btree ("string");