import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  integer,
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
  "broken_sidewalk"
]);



// ---------------- Tables ----------------

/**
 * ## Users Table
 * Stores core user information linked to Clerk authentication.
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(), // Clerk User ID
  name: text("name"),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"), // URL for the user's avatar
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Location
  latitude: decimal("latitude", { precision: 9, scale: 6 }),   // optional
  longitude: decimal("longitude", { precision: 9, scale: 6 }), // optional
  locationText: text("location_text"), // optional city/state or manual entry
});

/**
 * ## Reports Table
 * The central table for all user-submitted posts/reports.
 */
export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  description: text("description").notNull(),
  locationText: text("location_text"),
  latitude: decimal("latitude", { precision: 9, scale: 6 }),
  longitude: decimal("longitude", { precision: 9, scale: 6 }),
  imageUrl: text("image_url"), // URL from Cloudinary

  status: reportStatusEnum("status").default("pending").notNull(),
  category: reportCategoryEnum("category").notNull(),
  
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * ## Likes Table (Karma/Upvotes)
 * A join-table to manage which user has liked which report.
 */
export const likes = pgTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    reportId: integer("report_id")
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
  // ✅ REMOVED: The 'media' relation is no longer needed.
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