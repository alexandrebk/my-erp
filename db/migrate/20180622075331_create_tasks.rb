class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.date :ending_date
      t.boolean :done
      t.references :category, foreign_key: true, index: true

      t.timestamps
    end
  end
end
