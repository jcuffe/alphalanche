class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.references :user, index: true
      t.integer :score
      t.boolean :active
      t.binary :state

      t.timestamps
    end
  end
end
