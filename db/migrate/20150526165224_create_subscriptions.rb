class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.text :name
      t.text :keyword
      t.text :url

      t.timestamps null: false
    end
  end
end
