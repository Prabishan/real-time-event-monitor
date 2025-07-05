import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'matched_events' })
export class MatchedEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json' })
    event_json: object;

    @Column({ type: 'json' })
    rule_json: object;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}