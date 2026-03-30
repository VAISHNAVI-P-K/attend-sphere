/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: eventregistrations
 * Interface for EventRegistrations
 */
export interface EventRegistrations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  registrantName?: string;
  /** @wixFieldType text */
  registrantEmail?: string;
  /** @wixFieldType text */
  registrantPhone?: string;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType datetime */
  registrationDate?: Date | string;
  /** @wixFieldType text */
  attendanceStatus?: string;
}


/**
 * Collection ID: events
 * @catalog This collection is an eCommerce catalog
 * Interface for Events
 */
export interface Events {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType datetime */
  eventDate?: Date | string;
  /** @wixFieldType text */
  eventLocation?: string;
  /** @wixFieldType text */
  eventCategory?: string;
}


/**
 * Collection ID: supportinquiries
 * Interface for SupportInquiries
 */
export interface SupportInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userName?: string;
  /** @wixFieldType text */
  userEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionTime?: Date | string;
}
