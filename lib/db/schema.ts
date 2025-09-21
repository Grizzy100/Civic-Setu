import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  primaryKey,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------- Enums ----------------
export const reportStatusEnum = pgEnum("report_status", [
  "pending",
  "in_progress",
  "resolved",
]);

export const reportCategoryEnum = pgEnum("report_category", [
  "pothole",
  "streetlight",
  "drainage",
  "waste",
  "graffiti",
  "broken_sidewalk",
]);

// ---------------- Tables ----------------

/**
 * ## Users Table
 * Stores core user information linked to Clerk authentication.
 * Uses UUIDs in DB — you’ll need to map Clerk's `user.id` (string)
 * to this UUID when a user first signs in (e.g., store in metadata).
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(), // 🔥 UUID instead of text
  clerkId: text("clerk_id").notNull().unique(), // stores actual Clerk userId (string)
  name: text("name"),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Location
  latitude: decimal("latitude", { precision: 9, scale: 6 }),
  longitude: decimal("longitude", { precision: 9, scale: 6 }),
  locationText: text("location_text"),

  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
});

/**
 * ## Reports Table
 */
export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  description: text("description").notNull(),
  locationText: text("location_text"),
  latitude: decimal("latitude", { precision: 9, scale: 6 }),
  longitude: decimal("longitude", { precision: 9, scale: 6 }),
  imageUrl: text("image_url"),

  status: reportStatusEnum("status").default("pending").notNull(),
  category: reportCategoryEnum("category").notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * ## Likes Table (Karma/Upvotes)
 */
export const likes = pgTable(
  "likes",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reportId: uuid("report_id")
      .notNull()
      .references(() => reports.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.reportId] }),
  })
);

// ---------------- Relations ----------------
export const usersRelations = relations(users, ({ many }) => ({
  reports: many(reports),
  likes: many(likes),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  author: one(users, {
    fields: [reports.userId],
    references: [users.id],
  }),
  likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  report: one(reports, {
    fields: [likes.reportId],
    references: [reports.id],
  }),
}));
