class CreateStats < ActiveRecord::Migration
  def change
    create_table :stats do |t|
      t.integer :button_id
      t.string :high_scorer_name
      t.integer :high_score
      t.integer :times_played

      t.timestamps
    end
  end
end
