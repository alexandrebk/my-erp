# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "delete table Tasks"
Task.destroy_all

puts "delete table Categories"
Category.destroy_all

puts "delete table User"
User.destroy_all


puts "Create some Categories (urgent, pas urgent)"
urgent_important = Category.create!(
  id: 1,
  name: "Urgent Important"
)
pas_urgent_important = Category.create!(
  id: 2,
  name: "pas Urgent Important"
)
urgent_pas_important = Category.create!(
  id: 3,
  name: "pas Important Urgent"
)
pas_urgent_pas_important = Category.create!(
  id: 4,
  name: "pas Urgent pas Important"
)

puts "Create User"
alex = User.create!(
  email: 'alex@test.com',
  password: 'aaaaaa'
)

papa = User.create!(
  email: 'papa@test.com',
  password: 'aaaaaa'
)

puts "Create some Tasks (email / password)"
Task.create!(
  name: "My first task",
  ending_date: Date.today,
  done: false,
  category_id: 1,
  user_id: alex.id
)
Task.create!(
  name: "My second task",
  ending_date: Date.today,
  done: false,
  category_id: 2,
  user_id: alex.id
)

Task.create!(
  name: "My third task",
  ending_date: Date.today,
  done: false,
  category_id: 3,
  user_id: papa.id
)


