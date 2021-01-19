import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	admin: boolean;

	@Column()
	email: string;

	@Column()
	password?: string;

	@Column()
	name: string;

	@Column()
	identifier: string;

	@Column()
	phoneNumber: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default User;
